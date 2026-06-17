<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

// Sample data
const sampleData = [
  { id: 1, first_name: "Antonella", last_name: "Bellefonte", email: "abellefonte0@nba.com", gender: "Female", ip_address: "193.108.174.118" },
  { id: 2, first_name: "Wash", last_name: "Carnson", email: "wcarnson1@jalbum.net", gender: "Male", ip_address: "255.169.128.60" },
  { id: 3, first_name: "Betteanne", last_name: "Cowgill", email: "bcowgill2@timesonline.co.uk", gender: "Female", ip_address: "235.237.3.233" },
  { id: 4, first_name: "Lilith", last_name: "Astbury", email: "lastbury3@shinystat.com", gender: "Female", ip_address: "46.41.60.65" },
  { id: 5, first_name: "Nikos", last_name: "Vasenkov", email: "nvasenkov4@slate.com", gender: "Male", ip_address: "13.95.130.24" },
];

// Selection state
const selectedRows = ref<string[]>([]);
const multiSelectedRows = ref<string[]>(["row-1", "row-4"]);

// Sort state
const sortKey = ref("");
const sortDirection = ref("");

const handleRowSelect = (event: CustomEvent) => {
  console.log("Selected rows:", event.detail);
};

const handleSort = (event: CustomEvent) => {
  const [key, direction] = event.detail;
  sortKey.value = key;
  sortDirection.value = direction;
  console.log("Sort:", key, direction);
};

const basicCode = `<bl-table>
  <bl-table-header sticky>
    <bl-table-row>
      <bl-table-header-cell>ID</bl-table-header-cell>
      <bl-table-header-cell>Name</bl-table-header-cell>
      <bl-table-header-cell>Email</bl-table-header-cell>
    </bl-table-row>
  </bl-table-header>
  <bl-table-body>
    <bl-table-row>
      <bl-table-cell>1</bl-table-cell>
      <bl-table-cell>John Doe</bl-table-cell>
      <bl-table-cell>john@example.com</bl-table-cell>
    </bl-table-row>
    <bl-table-row>
      <bl-table-cell>2</bl-table-cell>
      <bl-table-cell>Jane Smith</bl-table-cell>
      <bl-table-cell>jane@example.com</bl-table-cell>
    </bl-table-row>
  </bl-table-body>
</bl-table>`;

const rowSelectionCode = `<bl-table selectable @bl-row-select="handleRowSelect">
  <bl-table-header>
    <bl-table-row>
      <bl-table-header-cell>ID</bl-table-header-cell>
      <bl-table-header-cell>Name</bl-table-header-cell>
    </bl-table-row>
  </bl-table-header>
  <bl-table-body>
    <bl-table-row selection-key="row-1">
      <bl-table-cell>1</bl-table-cell>
      <bl-table-cell>John Doe</bl-table-cell>
    </bl-table-row>
    <bl-table-row selection-key="row-2">
      <bl-table-cell>2</bl-table-cell>
      <bl-table-cell>Jane Smith</bl-table-cell>
    </bl-table-row>
  </bl-table-body>
</bl-table>`;

const multipleSelectionCode = `<bl-table selectable multiple @bl-row-select="handleRowSelect">
  <bl-table-header>
    <bl-table-row>
      <bl-table-header-cell>ID</bl-table-header-cell>
      <bl-table-header-cell>Name</bl-table-header-cell>
    </bl-table-row>
  </bl-table-header>
  <bl-table-body>
    <bl-table-row selection-key="row-1">
      <bl-table-cell>1</bl-table-cell>
      <bl-table-cell>John Doe</bl-table-cell>
    </bl-table-row>
    <!-- Header checkbox selects/deselects all -->
  </bl-table-body>
</bl-table>`;

const defaultSelectedCode = `<!-- Pre-select rows using selected attribute -->
<bl-table selectable multiple selected='["row-1","row-4"]'>
  ...
</bl-table>`;

const sortableCode = `<bl-table @bl-sort="handleSort">
  <bl-table-header>
    <bl-table-row>
      <bl-table-header-cell sortable sort-key="id">ID</bl-table-header-cell>
      <bl-table-header-cell sortable sort-key="first_name">First Name</bl-table-header-cell>
      <bl-table-header-cell sortable sort-key="last_name">Last Name</bl-table-header-cell>
      <bl-table-header-cell>Email</bl-table-header-cell>
    </bl-table-row>
  </bl-table-header>
  <bl-table-body>
    <bl-table-row>...</bl-table-row>
  </bl-table-body>
</bl-table>`;

const defaultSortCode = `<!-- Set initial sort on bl-table -->
<bl-table sort-key="first_name" sort-direction="asc">
  <bl-table-header>
    <bl-table-row>
      <bl-table-header-cell sortable sort-key="first_name">Name</bl-table-header-cell>
      ...
    </bl-table-row>
  </bl-table-header>
  ...
</bl-table>`;

const stickyHeaderCode = `<bl-table>
  <bl-table-header sticky>
    <bl-table-row>
      <bl-table-header-cell>Name</bl-table-header-cell>
      ...
    </bl-table-row>
  </bl-table-header>
  ...
</bl-table>`;

const stickyColumnsCode = `<!-- Sticky first column -->
<bl-table sticky-first-column>...</bl-table>

<!-- Sticky last column -->
<bl-table sticky-last-column>...</bl-table>

<!-- Both sticky -->
<bl-table sticky-first-column sticky-last-column>...</bl-table>`;

const columnWidthCode = `<bl-table-header-cell
  style="--bl-table-header-cell-width: 150px;
         --bl-table-header-cell-min-width: 100px;"
>
  Name
</bl-table-header-cell>`;

const tooltipCode = `<bl-table-header-cell>
  IP Address
  <bl-tooltip style="margin-inline-start: 8px">
    <bl-icon slot="tooltip-trigger" name="info"></bl-icon>
    IP address of end user
  </bl-tooltip>
</bl-table-header-cell>`;

const paginationCode = `<bl-table>
  <!-- Table content -->
</bl-table>

<bl-pagination
  current-page="1"
  total-items="100"
  has-jumper
  has-select
  @bl-change="handlePaginationChange"
></bl-pagination>`;

const noDataCode = `<bl-table>
  <bl-table-header sticky>
    <bl-table-row>
      <bl-table-header-cell>ID</bl-table-header-cell>
      <bl-table-header-cell>Name</bl-table-header-cell>
    </bl-table-row>
  </bl-table-header>
  <bl-table-body>
    <div slot="no-data">
      <bl-icon name="archive" style="font-size: 32px;"></bl-icon>
      <p>No data available</p>
      <bl-button>Add New Item</bl-button>
    </div>
  </bl-table-body>
</bl-table>`;

const disabledCellCode = `<bl-table-cell disabled>Disabled Cell</bl-table-cell>`;

const rtlCode = `<div dir="rtl">
  <bl-table>
    <bl-table-header sticky>
      <bl-table-row>
        <bl-table-header-cell>رقم الهوية</bl-table-header-cell>
        <bl-table-header-cell>الاسم</bl-table-header-cell>
        <bl-table-header-cell>البريد الإلكتروني</bl-table-header-cell>
      </bl-table-row>
    </bl-table-header>
    <bl-table-body>
      <bl-table-row>
        <bl-table-cell>١</bl-table-cell>
        <bl-table-cell>أحمد محمد</bl-table-cell>
        <bl-table-cell>ahmed@example.com</bl-table-cell>
      </bl-table-row>
    </bl-table-body>
  </bl-table>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Table is a component to visualize a data set in rows and columns. It needs to be used with
        <code>bl-table-header</code>, <code>bl-table-body</code>, <code>bl-table-row</code>,
        <code>bl-table-header-cell</code>, and <code>bl-table-cell</code> components.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Table Structure
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li><code>bl-table</code> - Main table container</li>
        <li>
          <code>bl-table-header</code> - Header section (use <code>sticky</code> attribute for
          sticky headers)
        </li>
        <li>
          <code>bl-table-header-cell</code> - Individual header cells (supports sorting)
        </li>
        <li><code>bl-table-body</code> - Body section (supports no-data slot)</li>
        <li>
          <code>bl-table-row</code> - Table rows (use <code>selection-key</code> for selectable
          rows)
        </li>
        <li>
          <code>bl-table-cell</code> - Individual data cells (supports <code>disabled</code>)
        </li>
      </ul>
    </div>

    <!-- Basic Table -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A simple table with header and body sections. Use <code>sticky</code> attribute on
        <code>bl-table-header</code> to keep headers visible while scrolling.
      </p>
    </div>

    <DemoSection title="Basic Table" :code="basicCode">
      <div style="height: 250px">
        <bl-table>
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell>ID</bl-table-header-cell>
              <bl-table-header-cell>First Name</bl-table-header-cell>
              <bl-table-header-cell>Last Name</bl-table-header-cell>
              <bl-table-header-cell>Email</bl-table-header-cell>
              <bl-table-header-cell>Gender</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row v-for="row in sampleData" :key="row.id">
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.last_name }}</bl-table-cell>
              <bl-table-cell>{{ row.email }}</bl-table-cell>
              <bl-table-cell>{{ row.gender }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Row Selection -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Row Selection</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To enable row selection, set the <code>selectable</code> attribute on
        <code>&lt;bl-table&gt;</code>. This allows users to select rows. Listen for the
        <code>@bl-row-select</code> event to handle row selection changes.
      </p>
    </div>

    <DemoSection title="Single Row Selection" :code="rowSelectionCode">
      <div style="height: 250px">
        <bl-table selectable @bl-row-select="handleRowSelect">
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell>ID</bl-table-header-cell>
              <bl-table-header-cell>First Name</bl-table-header-cell>
              <bl-table-header-cell>Last Name</bl-table-header-cell>
              <bl-table-header-cell>Email</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row
              v-for="row in sampleData"
              :key="row.id"
              :selection-key="`row-${row.id}`"
            >
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.last_name }}</bl-table-cell>
              <bl-table-cell>{{ row.email }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Multiple Row Selection -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Multiple Row Selection
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To enable multiple row selection, set both <code>selectable</code> and
        <code>multiple</code> attributes on <code>&lt;bl-table&gt;</code>. This modification allows
        users to select or unselect all rows by using checkbox in header.
      </p>
    </div>

    <DemoSection title="Multiple Selection" :code="multipleSelectionCode">
      <div style="height: 250px">
        <bl-table selectable multiple @bl-row-select="handleRowSelect">
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell>ID</bl-table-header-cell>
              <bl-table-header-cell>First Name</bl-table-header-cell>
              <bl-table-header-cell>Last Name</bl-table-header-cell>
              <bl-table-header-cell>Email</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row
              v-for="row in sampleData"
              :key="row.id"
              :selection-key="`row-${row.id}`"
            >
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.last_name }}</bl-table-cell>
              <bl-table-cell>{{ row.email }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Default Selected Value -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Default Selected Value
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To pre-select a row or rows upon initialization, provide the <code>selected</code> attribute
        with the ID(s) of the row(s) to be selected by default. This is useful for situations where
        certain rows need to be highlighted as selected when the table is first rendered.
      </p>
    </div>

    <DemoSection title="Pre-selected Rows" :code="defaultSelectedCode">
      <div style="height: 250px">
        <bl-table selectable multiple :selected="JSON.stringify(multiSelectedRows)">
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell>ID</bl-table-header-cell>
              <bl-table-header-cell>First Name</bl-table-header-cell>
              <bl-table-header-cell>Last Name</bl-table-header-cell>
              <bl-table-header-cell>Email</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row
              v-for="row in sampleData"
              :key="row.id"
              :selection-key="`row-${row.id}`"
            >
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.last_name }}</bl-table-cell>
              <bl-table-cell>{{ row.email }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Sortable -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Sortable</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To enable sorting functionality on a column, assign <code>sortable</code> and
        <code>sort-key</code> attributes to <code>&lt;bl-table-header-cell&gt;</code>. The
        <code>sort-key</code> should correspond to the data field associated with the column. Listen
        for the <code>@bl-sort</code> event on the table to handle sort changes.
      </p>
    </div>

    <DemoSection title="Sortable Columns" :code="sortableCode">
      <div style="height: 250px">
        <bl-table @bl-sort="handleSort">
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell sortable sort-key="id">ID</bl-table-header-cell>
              <bl-table-header-cell sortable sort-key="first_name">First Name</bl-table-header-cell>
              <bl-table-header-cell sortable sort-key="last_name">Last Name</bl-table-header-cell>
              <bl-table-header-cell>Email</bl-table-header-cell>
              <bl-table-header-cell>Gender</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row v-for="row in sampleData" :key="row.id">
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.last_name }}</bl-table-cell>
              <bl-table-cell>{{ row.email }}</bl-table-cell>
              <bl-table-cell>{{ row.gender }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
      <p class="text-sm text-neutral-dark mt-2">
        Current sort: {{ sortKey || "None" }}
        {{ sortDirection ? `(${sortDirection})` : "" }}
      </p>
    </DemoSection>

    <!-- Default Sorted Column -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Default Sorted Column
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To set a column as the default sorted column when the table loads, specify the
        <code>sort-key</code> and <code>sort-direction</code> on <code>&lt;bl-table&gt;</code> to
        match the desired column and direction. This sets the initial sort state for the table.
      </p>
    </div>

    <DemoSection title="Default Sorted" :code="defaultSortCode">
      <div style="height: 250px">
        <bl-table sort-key="first_name" sort-direction="asc">
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell sortable sort-key="id">ID</bl-table-header-cell>
              <bl-table-header-cell sortable sort-key="first_name">First Name</bl-table-header-cell>
              <bl-table-header-cell sortable sort-key="last_name">Last Name</bl-table-header-cell>
              <bl-table-header-cell>Email</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row v-for="row in sampleData" :key="row.id">
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.last_name }}</bl-table-cell>
              <bl-table-cell>{{ row.email }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Sticky Header -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Sticky Header</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To make the table header sticky, meaning it stays at the top of the table viewport as the
        user scrolls, use the <code>sticky</code> attribute on
        <code>&lt;bl-table-header&gt;</code>.
      </p>
    </div>

    <DemoSection title="Sticky Header" :code="stickyHeaderCode">
      <p class="text-sm text-neutral-dark dark:text-neutral-light p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
        Add <code>sticky</code> attribute to <code>&lt;bl-table-header&gt;</code> to keep the header
        fixed at the top while scrolling through table data.
      </p>
    </DemoSection>

    <!-- Sticky Columns -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Sticky First/Last Column
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To make the first or last column of the table sticky (visible during horizontal scroll), use
        the <code>sticky-first-column</code> or <code>sticky-last-column</code> attributes on
        <code>&lt;bl-table&gt;</code>.
      </p>
    </div>

    <DemoSection title="Sticky Columns" :code="stickyColumnsCode">
      <div style="height: 250px; overflow-x: auto">
        <bl-table sticky-first-column sticky-last-column>
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell
                style="--bl-table-header-cell-min-width: 100px"
              >ID</bl-table-header-cell>
              <bl-table-header-cell
                style="--bl-table-header-cell-min-width: 200px"
              >First Name</bl-table-header-cell>
              <bl-table-header-cell
                style="--bl-table-header-cell-min-width: 200px"
              >Last Name</bl-table-header-cell>
              <bl-table-header-cell
                style="--bl-table-header-cell-min-width: 250px"
              >Email</bl-table-header-cell>
              <bl-table-header-cell
                style="--bl-table-header-cell-min-width: 150px"
              >Gender</bl-table-header-cell>
              <bl-table-header-cell
                style="--bl-table-header-cell-min-width: 150px"
              >IP Address</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row v-for="row in sampleData" :key="row.id">
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.last_name }}</bl-table-cell>
              <bl-table-cell>{{ row.email }}</bl-table-cell>
              <bl-table-cell>{{ row.gender }}</bl-table-cell>
              <bl-table-cell>{{ row.ip_address }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Column Width -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Column Width Customization
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use CSS custom properties to customize column widths:
        <code>--bl-table-header-cell-width</code> and
        <code>--bl-table-header-cell-min-width</code>.
      </p>
    </div>

    <DemoSection title="Column Width" :code="columnWidthCode">
      <div style="height: 200px">
        <bl-table>
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell style="--bl-table-header-cell-width: 80px">
                ID
              </bl-table-header-cell>
              <bl-table-header-cell style="--bl-table-header-cell-min-width: 200px">
                Name (min 200px)
              </bl-table-header-cell>
              <bl-table-header-cell style="--bl-table-header-cell-width: 300px">
                Email (fixed 300px)
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row>
              <bl-table-cell>1</bl-table-cell>
              <bl-table-cell>John Doe</bl-table-cell>
              <bl-table-cell>john@example.com</bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>2</bl-table-cell>
              <bl-table-cell>Jane Smith</bl-table-cell>
              <bl-table-cell>jane@example.com</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Header with Tooltip -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Header Cell with Tooltip
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can add tooltips to header cells to provide additional information about the column.
      </p>
    </div>

    <DemoSection title="Header Tooltip" :code="tooltipCode">
      <div style="height: 200px">
        <bl-table>
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell>ID</bl-table-header-cell>
              <bl-table-header-cell>Name</bl-table-header-cell>
              <bl-table-header-cell>
                <div style="display: flex; align-items: center">
                  IP Address
                  <bl-tooltip style="margin-inline-start: 8px">
                    <bl-icon slot="tooltip-trigger" name="info"></bl-icon>
                    IP address of end user
                  </bl-tooltip>
                </div>
              </bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row v-for="row in sampleData.slice(0, 3)" :key="row.id">
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.ip_address }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Table with Pagination -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Table with Pagination
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        To enable pagination on the table, use the <code>bl-pagination</code> component. The
        <code>@bl-change</code> event is used to handle page changes, providing details about the
        current page and the number of items per page.
      </p>
    </div>

    <DemoSection title="With Pagination" :code="paginationCode">
      <div style="height: 250px">
        <bl-table>
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell>ID</bl-table-header-cell>
              <bl-table-header-cell>First Name</bl-table-header-cell>
              <bl-table-header-cell>Last Name</bl-table-header-cell>
              <bl-table-header-cell>Email</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row v-for="row in sampleData.slice(0, 3)" :key="row.id">
              <bl-table-cell>{{ row.id }}</bl-table-cell>
              <bl-table-cell>{{ row.first_name }}</bl-table-cell>
              <bl-table-cell>{{ row.last_name }}</bl-table-cell>
              <bl-table-cell>{{ row.email }}</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
      <div class="flex justify-end mt-4">
        <bl-pagination current-page="1" total-items="50" has-jumper has-select></bl-pagination>
      </div>
    </DemoSection>

    <!-- No Data Slot -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">No Data Slot</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        When there are no rows in the table, you can display custom content using the
        <code>no-data</code> slot. This slot appears automatically when no
        <code>bl-table-row</code> elements are present in the table body. If no custom slot is
        provided, a default no-data message will be displayed.
      </p>
    </div>

    <DemoSection title="No Data" :code="noDataCode">
      <div style="height: 300px">
        <bl-table>
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell>ID</bl-table-header-cell>
              <bl-table-header-cell>Name</bl-table-header-cell>
              <bl-table-header-cell>Email</bl-table-header-cell>
              <bl-table-header-cell>Status</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <div slot="no-data">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  min-height: 200px;
                "
              >
                <bl-icon
                  name="archive"
                  style="font-size: 32px; margin-bottom: 16px; color: var(--bl-color-primary)"
                ></bl-icon>
                <p style="margin: 0; font-weight: 500; color: var(--bl-color-neutral-darker)">
                  Custom Empty State
                </p>
                <p
                  style="margin: 8px 0 0 0; font-size: 14px; color: var(--bl-color-neutral-light)"
                >
                  This is a custom no-data slot implementation.
                </p>
                <bl-button style="margin-top: 16px">Add New Item</bl-button>
              </div>
            </div>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- Disabled Cells -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabled Cells
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can disable individual cells by adding the <code>disabled</code> attribute to
        <code>bl-table-cell</code>. This is useful when certain data should be visually marked as
        unavailable.
      </p>
    </div>

    <DemoSection title="Disabled Cells" :code="disabledCellCode">
      <div style="height: 200px">
        <bl-table>
          <bl-table-header sticky>
            <bl-table-row>
              <bl-table-header-cell>ID</bl-table-header-cell>
              <bl-table-header-cell>Name</bl-table-header-cell>
              <bl-table-header-cell>Status</bl-table-header-cell>
            </bl-table-row>
          </bl-table-header>
          <bl-table-body>
            <bl-table-row>
              <bl-table-cell disabled>1</bl-table-cell>
              <bl-table-cell disabled>John Doe (Disabled Row)</bl-table-cell>
              <bl-table-cell disabled>Inactive</bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>2</bl-table-cell>
              <bl-table-cell>Jane Smith</bl-table-cell>
              <bl-table-cell>Active</bl-table-cell>
            </bl-table-row>
            <bl-table-row>
              <bl-table-cell>3</bl-table-cell>
              <bl-table-cell>Bob Wilson</bl-table-cell>
              <bl-table-cell disabled>Pending (Disabled)</bl-table-cell>
            </bl-table-row>
          </bl-table-body>
        </bl-table>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The table component supports RTL (Right-to-Left) text direction. You can enable RTL mode by
        setting the <code>dir</code> attribute on a parent element or the <code>html</code> tag.
        Columns are automatically aligned from right to left in RTL mode.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div class="flex-1">
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <div style="height: 200px">
            <bl-table>
              <bl-table-header sticky>
                <bl-table-row>
                  <bl-table-header-cell>ID</bl-table-header-cell>
                  <bl-table-header-cell>Name</bl-table-header-cell>
                  <bl-table-header-cell>Email</bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row>
                  <bl-table-cell>1</bl-table-cell>
                  <bl-table-cell>John Doe</bl-table-cell>
                  <bl-table-cell>john@example.com</bl-table-cell>
                </bl-table-row>
                <bl-table-row>
                  <bl-table-cell>2</bl-table-cell>
                  <bl-table-cell>Jane Smith</bl-table-cell>
                  <bl-table-cell>jane@example.com</bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>
          </div>
        </div>
        <div class="flex-1" dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <div style="height: 200px">
            <bl-table>
              <bl-table-header sticky>
                <bl-table-row>
                  <bl-table-header-cell>رقم الهوية</bl-table-header-cell>
                  <bl-table-header-cell>الاسم</bl-table-header-cell>
                  <bl-table-header-cell>البريد الإلكتروني</bl-table-header-cell>
                </bl-table-row>
              </bl-table-header>
              <bl-table-body>
                <bl-table-row>
                  <bl-table-cell>١</bl-table-cell>
                  <bl-table-cell>جون دو</bl-table-cell>
                  <bl-table-cell>john@example.com</bl-table-cell>
                </bl-table-row>
                <bl-table-row>
                  <bl-table-cell>٢</bl-table-cell>
                  <bl-table-cell>جين سميث</bl-table-cell>
                  <bl-table-cell>jane@example.com</bl-table-cell>
                </bl-table-row>
              </bl-table-body>
            </bl-table>
          </div>
        </div>
      </div>
    </DemoSection>

    <!-- Sub-Component API References -->
    <div class="mt-12 border-t border-neutral-lighter dark:border-neutral-darker pt-8">
      <h2 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-6">
        Sub-Component API Reference
      </h2>

      <!-- bl-table-header API -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
          bl-table-header
        </h3>
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
          The header section of the table.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Attribute</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">sticky</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">boolean</td>
                <td class="py-3 px-4 text-neutral-dark">false</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Makes the header sticky at the top while scrolling
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- bl-table-header-cell API -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
          bl-table-header-cell
        </h3>
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
          Individual header cell with optional sorting support.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Attribute</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">sortable</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">boolean</td>
                <td class="py-3 px-4 text-neutral-dark">false</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Enables sorting for this column
                </td>
              </tr>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">sort-key</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">string</td>
                <td class="py-3 px-4 text-neutral-dark">-</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Key used to identify this column when sorting
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4">
          <h4 class="text-sm font-medium text-neutral-dark mb-2">CSS Custom Properties</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Property</th>
                  <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <td class="py-3 px-4">
                    <code class="text-primary">--bl-table-header-cell-width</code>
                  </td>
                  <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                    Sets the fixed width of the header cell
                  </td>
                </tr>
                <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                  <td class="py-3 px-4">
                    <code class="text-primary">--bl-table-header-cell-min-width</code>
                  </td>
                  <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                    Sets the minimum width of the header cell
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- bl-table-row API -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
          bl-table-row
        </h3>
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
          A row in the table body.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Attribute</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">selection-key</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">string</td>
                <td class="py-3 px-4 text-neutral-dark">-</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Unique key to identify this row for selection
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- bl-table-cell API -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
          bl-table-cell
        </h3>
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
          Individual data cell in a table row.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Attribute</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Type</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Default</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">disabled</code></td>
                <td class="py-3 px-4 text-neutral-dark font-mono text-xs">boolean</td>
                <td class="py-3 px-4 text-neutral-dark">false</td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Visually marks the cell as disabled
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- bl-table-body API -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
          bl-table-body
        </h3>
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
          The body section of the table. No props or CSS properties, but supports the
          <code>no-data</code> slot.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Slot</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-dark">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">default</code></td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Place <code>bl-table-row</code> elements here
                </td>
              </tr>
              <tr class="border-b border-neutral-lightest dark:border-neutral-darker">
                <td class="py-3 px-4"><code class="text-primary">no-data</code></td>
                <td class="py-3 px-4 text-neutral-darker dark:text-neutral-lighter">
                  Custom content to display when there are no rows
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
