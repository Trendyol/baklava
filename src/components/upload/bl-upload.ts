import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import "../icon/bl-icon";
import "../spinner/bl-spinner";
import style from "./bl-upload.css";

type FileStatus = "pending" | "uploading" | "success" | "error";

interface FileItem {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  status: FileStatus;
  progress: number;
  errorMessage?: string;
}

/**
 * @tag bl-upload
 * @summary Baklava Upload component with drag & drop support
 *
 * @cssproperty [--bl-upload-background-color=--bl-color-neutral-lightest] Background color
 * @cssproperty [--bl-upload-border-color=--bl-color-neutral-lighter] Border color
 * @cssproperty [--bl-upload-icon-color=--bl-color-primary] Icon color
 */
@customElement("bl-upload")
export default class BlUpload extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Layout variant: horizontal, vertical, or button
   */
  @property({ type: String, reflect: true })
  variant: "horizontal" | "vertical" | "button" = "horizontal";

  /**
   * Accepted file types (e.g., "image/*", ".pdf,.doc", "image/png,image/jpeg")
   */
  @property({ type: String })
  accept?: string;

  /**
   * Allow multiple file selection
   */
  @property({ type: Boolean })
  multiple = false;

  /**
   * Maximum file size in bytes (default: 10MB)
   */
  @property({ type: Number, attribute: "max-file-size" })
  maxFileSize = 10 * 1024 * 1024;

  /**
   * Maximum number of files (only applies when multiple is true)
   */
  @property({ type: Number, attribute: "max-files" })
  maxFiles = 10;

  /**
   * Header text
   */
  @property({ type: String, attribute: "header-text" })
  headerText = "Dosya Seç / Sürükle";

  /**
   * Description text
   */
  @property({ type: String, attribute: "description-text" })
  descriptionText = "JPG, JPEG, PNG, Maksimum 10MB";

  /**
   * Button text
   */
  @property({ type: String, attribute: "button-text" })
  buttonText = "Dosya Seç";

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Show file list below upload area
   */
  @property({ type: Boolean, attribute: "show-file-list" })
  showFileList = true;

  /**
   * Auto upload files immediately after selection (simulated)
   */
  @property({ type: Boolean, attribute: "auto-upload" })
  autoUpload = false;

  /**
   * Callback function called when files are selected
   */
  @property({ attribute: false })
  onFilesSelected?: (
    files: { file: File; id: string; name: string; size: number; type: string }[]
  ) => void;

  /**
   * Callback function called when there's an error
   */
  @property({ attribute: false })
  onError?: (
    errors: { file: File; error: "size" | "type" | "maxFiles"; message: string }[]
  ) => void;

  /**
   * Callback function called when a file is removed
   */
  @property({ attribute: false })
  onFileRemoved?: (file: {
    file: File;
    id: string;
    name: string;
    size: number;
    type: string;
  }) => void;

  @state()
  private _isDragOver = false;

  @state()
  private _fileItems: FileItem[] = [];

  @query('input[type="file"]')
  private _fileInput!: HTMLInputElement;

  /**
   * Fires when files are successfully selected or dropped
   */
  @event("bl-upload") private onUpload: EventDispatcher<{
    files: { file: File; id: string; name: string; size: number; type: string }[];
  }>;

  /**
   * Fires when there's an error with file selection
   */
  @event("bl-upload-error") private onUploadError: EventDispatcher<{
    errors: { file: File; error: "size" | "type" | "maxFiles"; message: string }[];
  }>;

  /**
   * Fires when a file is removed from the list
   */
  @event("bl-file-remove") private onFileRemove: EventDispatcher<{
    file: { file: File; id: string; name: string; size: number; type: string };
  }>;

  private _generateId(): string {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private _formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  private _isValidFileType(file: File): boolean {
    if (!this.accept) return true;

    const acceptedTypes = this.accept.split(",").map(t => t.trim().toLowerCase());

    for (const acceptedType of acceptedTypes) {
      if (acceptedType.endsWith("/*")) {
        const category = acceptedType.slice(0, -2);

        if (file.type.toLowerCase().startsWith(category + "/")) {
          return true;
        }
      } else if (acceptedType.startsWith(".")) {
        if (file.name.toLowerCase().endsWith(acceptedType)) {
          return true;
        }
      } else {
        if (file.type.toLowerCase() === acceptedType) {
          return true;
        }
      }
    }

    return false;
  }

  private _toPublicFile(item: FileItem): {
    file: File;
    id: string;
    name: string;
    size: number;
    type: string;
  } {
    return {
      file: item.file,
      id: item.id,
      name: item.name,
      size: item.size,
      type: item.type,
    };
  }

  private _validateFiles(files: File[]): {
    valid: FileItem[];
    errors: { file: File; error: "size" | "type" | "maxFiles"; message: string }[];
    errorFileIds: { id: string; errorMessage: string }[];
  } {
    const valid: FileItem[] = [];
    const errors: { file: File; error: "size" | "type" | "maxFiles"; message: string }[] = [];
    const errorFileIds: { id: string; errorMessage: string }[] = [];

    const currentFileCount = this._fileItems.length;
    const maxFilesToProcess = this.multiple ? this.maxFiles - currentFileCount : 1;
    const filesToProcess = files.slice(0, Math.max(0, maxFilesToProcess));

    if (files.length > maxFilesToProcess) {
      for (let i = maxFilesToProcess; i < files.length; i++) {
        errors.push({
          file: files[i],
          error: "maxFiles",
          message: `Maksimum ${this.maxFiles} dosya yüklenebilir`,
        });
      }
    }

    for (const file of filesToProcess) {
      const fileId = this._generateId();

      if (!this._isValidFileType(file)) {
        // accept is always defined here because _isValidFileType returns true when accept is undefined
        const acceptedFormats = this.accept!.replace(/,/g, ", ");
        const errorMessage = `Yanlış dosya formatı, dosya formatı ${acceptedFormats} olmalıdır.`;

        valid.push({
          file,
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          status: "uploading",
          progress: 0,
          errorMessage,
        });
        errorFileIds.push({ id: fileId, errorMessage });
        errors.push({
          file,
          error: "type",
          message: `Geçersiz dosya tipi: ${file.type || "bilinmiyor"}`,
        });
        continue;
      }

      if (file.size > this.maxFileSize) {
        const errorMessage = `Dosya boyutu çok büyük: ${this._formatFileSize(
          file.size
        )} (Maksimum: ${this._formatFileSize(this.maxFileSize)})`;

        valid.push({
          file,
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          status: "uploading",
          progress: 0,
          errorMessage,
        });
        errorFileIds.push({ id: fileId, errorMessage });
        errors.push({
          file,
          error: "size",
          message: errorMessage,
        });
        continue;
      }

      valid.push({
        file,
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
      });
    }

    return { valid, errors, errorFileIds };
  }

  private _simulateUpload(fileId: string, willFail: boolean = false, errorMessage?: string) {
    let progress = 0;
    const progressStep = willFail ? Math.random() * 15 + 10 : Math.random() * 20 + 15;
    const intervalTime = 150;

    const interval = setInterval(() => {
      progress += progressStep + Math.random() * 10;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        if (willFail) {
          this._updateFileStatusWithError(
            fileId,
            "error",
            100,
            errorMessage || "Dosya yüklenemedi"
          );
        } else {
          this._updateFileStatus(fileId, "success", 100);
        }
      } else {
        this._updateFileProgress(fileId, progress);
      }
    }, intervalTime);
  }

  private _updateFileStatusWithError(
    fileId: string,
    status: FileStatus,
    progress: number,
    errorMessage: string
  ) {
    this._fileItems = this._fileItems.map(f =>
      f.id === fileId ? { ...f, status, progress, errorMessage } : f
    );
  }

  private _updateFileProgress(fileId: string, progress: number) {
    this._fileItems = this._fileItems.map(f =>
      f.id === fileId ? { ...f, progress: Math.min(100, progress) } : f
    );
  }

  private _updateFileStatus(fileId: string, status: FileStatus, progress?: number) {
    this._fileItems = this._fileItems.map(f =>
      f.id === fileId
        ? { ...f, status, progress: progress !== undefined ? progress : f.progress }
        : f
    );
  }

  private _processFiles(files: FileList | null) {
    if (!files || files.length === 0 || this.disabled) return;

    const fileArray = Array.from(files);
    const { valid, errors, errorFileIds } = this._validateFiles(fileArray);

    if (valid.length > 0) {
      this._fileItems = this.multiple ? [...this._fileItems, ...valid] : valid;

      valid.forEach(f => {
        const errorInfo = errorFileIds.find(e => e.id === f.id);

        if (errorInfo) {
          this._simulateUpload(f.id, true, errorInfo.errorMessage);
        } else {
          this._simulateUpload(f.id, false);
        }
      });

      const publicFiles = valid.map(f => this._toPublicFile(f));

      this.onUpload({ files: publicFiles });

      if (this.onFilesSelected) {
        this.onFilesSelected(publicFiles);
      }
    }

    if (errors.length > 0) {
      this.onUploadError({ errors });

      if (this.onError) {
        this.onError(errors);
      }
    }

    if (this._fileInput) {
      this._fileInput.value = "";
    }
  }

  private _handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.disabled) return;

    this._isDragOver = true;
  };

  private _handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const relatedTarget = e.relatedTarget as Node;

    if (!this.shadowRoot?.contains(relatedTarget)) {
      this._isDragOver = false;
    }
  };

  private _handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this._isDragOver = false;

    if (this.disabled) return;

    const files = e.dataTransfer?.files;

    this._processFiles(files ?? null);
  };

  private _handleFileInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;

    this._processFiles(input.files);
  };

  private _handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.disabled) return;

    this._fileInput?.click();
  };

  private _handleContainerClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "BL-BUTTON" || target.closest("bl-button")) {
      return;
    }

    if (this.disabled) return;

    this._fileInput?.click();
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._fileInput?.click();
    }
  };

  private _handleRemoveFile = (e: MouseEvent, fileId: string) => {
    e.stopPropagation();
    const fileItem = this._fileItems.find(f => f.id === fileId);

    if (fileItem) {
      this._fileItems = this._fileItems.filter(f => f.id !== fileId);
      const publicFile = this._toPublicFile(fileItem);

      this.onFileRemove({ file: publicFile });

      if (this.onFileRemoved) {
        this.onFileRemoved(publicFile);
      }
    }
  };

  /**
   * Returns the list of uploaded files
   */
  get files(): { file: File; id: string; name: string; size: number; type: string }[] {
    return this._fileItems.map(f => this._toPublicFile(f));
  }

  /**
   * Clears all uploaded files
   */
  clearFiles() {
    this._fileItems = [];
    if (this._fileInput) {
      this._fileInput.value = "";
    }
  }

  private _getStatusIcon(status: FileStatus) {
    switch (status) {
      case "success":
        return "check_fill";
      case "error":
        return "alert";
      case "pending":
        return "loading";
      default:
        return "pending";
    }
  }

  private _renderFileList(): TemplateResult | null {
    if (!this.showFileList || this._fileItems.length === 0) {
      return null;
    }

    return html`
      <div class="file-list">${this._fileItems.map(file => this._renderFileItem(file))}</div>
    `;
  }

  private _renderStatusIcon(file: FileItem): TemplateResult {
    if (file.status === "pending" || file.status === "uploading") {
      return html` <bl-spinner class="status-icon" size="small"></bl-spinner>`;
    }

    return html` <bl-icon class="status-icon" name=${this._getStatusIcon(file.status)}></bl-icon>`;
  }

  private _handleFileNameClick = (e: MouseEvent, file: FileItem) => {
    e.stopPropagation();
    const url = URL.createObjectURL(file.file);
    const a = document.createElement("a");

    a.href = url;
    a.download = file.name;
    a.rel = "download";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  private _renderFileItem(file: FileItem): TemplateResult {
    const itemClasses = {
      "file-item": true,
      [`status-${file.status}`]: true,
    };

    const progressClasses = {
      "progress-bar": true,
      [`progress-${file.status}`]: true,
    };

    return html`
      <div class=${classMap(itemClasses)}>
        <div class="file-info">
          <div class="file-details">
            ${this._renderStatusIcon(file)}
            <button
              type="button"
              class="file-name"
              @click=${(e: MouseEvent) => this._handleFileNameClick(e, file)}
            >
              ${file.name}
            </button>
          </div>
          <bl-button
            variant="tertiary"
            kind="neutral"
            size="small"
            icon="close"
            label="Dosyayı kaldır"
            class="remove-button"
            @click=${(e: MouseEvent) => this._handleRemoveFile(e, file.id)}
          ></bl-button>
        </div>
        ${file.status === "error" && file.errorMessage
          ? html`<span class="error-message">${file.errorMessage}</span>`
          : null}
        <div class="progress-container">
          <div class=${classMap(progressClasses)} style="width: ${file.progress}%"></div>
        </div>
      </div>
    `;
  }

  private _renderLayout(): TemplateResult {
    const variantLayout =
      this.variant !== "button"
        ? html` <div class="upload-content">
            <bl-icon class="upload-icon" name="upload"></bl-icon>
            <div class="text-container">
              <span class="header">${this.headerText}</span>
              <span class="description">${this.descriptionText}</span>
            </div>
          </div>`
        : "";

    return html`
      ${variantLayout}
      <bl-button variant="secondary" ?disabled=${this.disabled} @click=${this._handleButtonClick}>
        ${this.buttonText}
      </bl-button>
    `;
  }

  render(): TemplateResult {
    const containerClasses = {
      "upload-container": true,
      "drag-over": this.variant !== "button" && this._isDragOver,
      "disabled": this.disabled,
      [`variant-${this.variant}`]: true,
    };

    const wrapperClasses =
      `${this.variant}-wrapper ${this.variant !== "button" ? "upload-wrapper" : ""}` +
      (this._isDragOver && this.variant !== "button" ? " drag-over" : "");

    return html`
      <div class=${wrapperClasses}>
        <div
          class=${classMap(containerClasses)}
          @dragover=${this._handleDragOver}
          @dragleave=${this._handleDragLeave}
          @drop=${this._handleDrop}
          @click=${this._handleContainerClick}
          @keydown=${this._handleKeyDown}
          tabindex=${this.disabled ? -1 : 0}
          role="button"
          aria-label="${this.headerText}"
          aria-disabled=${this.disabled}
        >
          <input
            type="file"
            accept=${this.accept || ""}
            ?multiple=${this.multiple}
            ?disabled=${this.disabled}
            @change=${this._handleFileInputChange}
            hidden
          />

          ${this._renderLayout()}
        </div>
      </div>
      ${this._renderFileList()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-upload": BlUpload;
  }
}
