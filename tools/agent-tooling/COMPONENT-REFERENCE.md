# Baklava — Component Reference

> `dist/custom-elements.json` manifest'inden otomatik üretilen, tüm `bl-*` bileşenlerinin referansı.

Her bileşen: tag, properties (attribute), events, slots, css custom properties.


## `bl-accordion`

- **Properties/Attributes:**
  - `open : boolean`
  - `caption : string | undefined`
  - `icon : boolean | BaklavaIcon | undefined`
  - `disabled : boolean`
  - `animationDuration : number`
  - `_animation : Animation | null`
  - `_animationStatus : AnimationStatus | null`
  - `detailsEl : HTMLDetailsElement`
  - `summaryEl : HTMLElement`
  - `contentEl : HTMLElement`
  - `_cleanupStyles`
  - `_animate`
  - `_onAnimationFinish`
  - `expand`
  - `collapse`
  - `_clickHandler`
- **Events:**
  - `bl-toggle : CustomEvent<boolean>`
- **Slots:**
  - ``
  - `caption`
- **CSS Custom Properties:**
  - (yok)

## `bl-accordion-group`

- **Properties/Attributes:**
  - `multiple : boolean`
  - `accordions : BlAccordion[]`
  - `handleToggleAccordions`
- **Events:**
  - (yok)
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - (yok)

## `bl-alert`

- **Properties/Attributes:**
  - `variant : AlertVariant`
  - `description : string | undefined`
  - `icon : boolean | BaklavaIcon | undefined`
  - `closable : boolean`
  - `caption : string | undefined`
  - `closed : boolean`
  - `open`
  - `close`
  - `_hasAlertCaptionSlot`
  - `_closeHandler`
  - `_predefinedIcons`
  - `_getIcon`
  - `_initAlertActionSlot`
- **Events:**
  - `bl-close : CustomEvent<boolean>`
- **Slots:**
  - ``
  - `caption`
  - `action`
  - `action-secondary`
- **CSS Custom Properties:**
  - (yok)

## `bl-badge`

- **Properties/Attributes:**
  - `size : BadgeSize`
  - `icon : BaklavaIcon | undefined`
- **Events:**
  - (yok)
- **Slots:**
  - ``
  - `icon`
- **CSS Custom Properties:**
  - `--bl-badge-bg-color`
  - `--bl-badge-color`

## `bl-button`

- **Properties/Attributes:**
  - `variant : ButtonVariant`
  - `kind : ButtonKind`
  - `size : ButtonSize`
  - `label : string`
  - `loadingLabel : string`
  - `loading : boolean`
  - `disabled : boolean`
  - `href : string | undefined`
  - `icon : BaklavaIcon | undefined`
  - `target : TargetType | undefined`
  - `type : "submit"`
  - `dropdown : boolean`
  - `autofocus : boolean`
  - `form : HTMLFormElement | string`
  - `active : boolean`
  - `button : HTMLAnchorElement | HTMLButtonElement`
  - `_isActive`
  - `caretTemplate`
  - `_handleClick`
  - `focus`
  - `_hasIconSlot`
  - `_hasDefaultSlot`
- **Events:**
  - `bl-click : CustomEvent<string>`
- **Slots:**
  - ``
  - `icon`
- **CSS Custom Properties:**
  - `--bl-button-display`
  - `--bl-button-justify`

## `bl-calendar`

- **Properties/Attributes:**
  - `today`
  - `_calendarMonth : number`
  - `_calendarYear : number`
  - `_calendarView : CalendarView`
  - `_calendarYears : number[]`
  - `_calendarDays : CalendarDay[]`
  - `_dates : Date[]`
  - `dayRenderer : (date: Date) => TemplateResult | undefined`
  - `months`
  - `days`
  - `handleClearSelectedDates`
  - `getDayNumInAMonth`
  - `getWeekDayOfDate`
  - `setPreviousCalendarView`
  - `setNextCalendarView`
  - `setCurrentCalendarView`
  - `setMonthAndCalendarView`
  - `setYearAndCalendarView`
  - `generateSurroundingYears`
  - `clearRangePickerStyles`
  - `handleDate`
  - `handleSingleSelectCalendar`
  - `handleMultipleSelectCalendar`
  - `handleRangeSelectCalendar`
  - `checkIfSelectedDate`
  - `checkIfDateIsToday`
  - `checkIfDateIsDisabled`
  - `setHoverClass`
  - `createCalendarDays`
  - `renderCalendarHeader`
  - `renderCalendarDays`
  - `renderCalendarMonths`
  - `renderCalendarYears`
  - `type : CalendarType`
  - `startOfWeek : DayValues`
  - `locale : string`
  - `monthYearOnly : boolean`
  - `_disabledDates : Date[]`
  - `disabledDates : Date[]`
  - `_maxDate : Date`
  - `maxDate`
  - `_minDate : Date`
  - `minDate`
  - `value : string | Date | Date[]`
  - `_value : string | Date | Date[]`
- **Events:**
  - `bl-calendar-change : CustomEvent<Date[]>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-checkbox`

- **Properties/Attributes:**
  - `shadowRootOptions : object`
  - `formControlValidators : array`
  - `validationTarget : HTMLInputElement`
  - `checked : boolean`
  - `value : string`
  - `required : boolean`
  - `customInvalidText : string | undefined`
  - `disabled : boolean`
  - `indeterminate : boolean`
  - `checkboxElement : HTMLElement`
  - `dirty : boolean`
  - `field : BlCheckboxGroup | null`
  - `reportValidity`
  - `validityCallback`
  - `focus`
  - `blur`
  - `handleSubmit`
  - `handleChange`
  - `handleFieldValueChange`
  - `handleKeyDown`
- **Events:**
  - `bl-checkbox-change : CustomEvent<boolean>`
  - `bl-focus : CustomEvent<string>`
  - `bl-blur : CustomEvent<string>`
  - `bl-checkbox-invalid : CustomEvent<ValidityState>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-checkbox-group`

- **Properties/Attributes:**
  - `shadowRootOptions : object`
  - `formControlValidators : array`
  - `validationTarget : HTMLElement`
  - `name : string`
  - `label : string`
  - `value : string[] | null`
  - `required : boolean`
  - `customInvalidText : string | undefined`
  - `dirty : boolean`
  - `options : BlCheckbox[]`
  - `checkedOptions : string[]`
  - `availableOptions : BlCheckbox[]`
  - `setFormValue`
  - `focusedOptionIndex : number`
  - `handleOptionChecked`
  - `handleKeyDown`
  - `handleFocus`
  - `handleSubmit`
  - `checkOptionsValidity`
  - `validityCallback`
  - `reportValidity`
- **Events:**
  - `bl-checkbox-group-change : CustomEvent<string[]>`
  - `bl-checkbox-group-invalid : CustomEvent<ValidityState>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - `--bl-checkbox-direction`

## `bl-datepicker`

- **Properties/Attributes:**
  - `placeholder : string`
  - `size : InputSize | undefined`
  - `labelFixed : boolean`
  - `label : string`
  - `valueFormatter : ((dates: Date[]) => string) | null`
  - `disabled : boolean`
  - `helpText : string`
  - `dayRenderer : (date: Date) => TemplateResult | undefined`
  - `_inputValue : string`
  - `_floatingDateCount : number`
  - `_fittingDateCount : number`
  - `_calendarEl : BlCalendar`
  - `_popoverEl : BlPopover`
  - `_inputEl : BlInput`
  - `_onCalendarMouseDown : (event: MouseEvent) => void`
  - `_onInputMouseDown : (event: MouseEvent) => void`
  - `defaultInputValueFormatter`
  - `closePopoverWithTimeout`
  - `setFloatingDates`
  - `setDatePickerInput`
  - `formatDate`
  - `clearDatepicker`
  - `openPopover`
  - `closePopover`
  - `_togglePopover`
  - `formatAdditionalDates`
  - `onCalendarChange`
  - `type : CalendarType`
  - `startOfWeek : DayValues`
  - `locale : string`
  - `monthYearOnly : boolean`
  - `_disabledDates : Date[]`
  - `disabledDates : Date[]`
  - `_maxDate : Date`
  - `maxDate`
  - `_minDate : Date`
  - `minDate`
  - `value : string | Date | Date[]`
  - `_value : string | Date | Date[]`
- **Events:**
  - `bl-datepicker-change : CustomEvent<Date[]>`
- **Slots:**
  - `icon`
- **CSS Custom Properties:**
  - `--bl-datepicker-input-width`

## `bl-dialog`

- **Properties/Attributes:**
  - `open : boolean`
  - `caption : string | undefined`
  - `critical : boolean`
  - `polyfilled : boolean`
  - `_footerAssignedSlots`
  - `dialog : HTMLDialogElement & DialogElement`
  - `footer : HTMLElement`
  - `container : HTMLElement`
  - `content : HTMLElement`
  - `_hasFooter`
  - `toggleDialogHandler`
  - `closeDialog`
  - `clickOutsideHandler`
  - `onKeydown`
  - `toggleFooterShadow`
  - `toggleFooterVisibility`
  - `renderContainer`
- **Events:**
  - `bl-dialog-open : CustomEvent<object>`
  - `bl-dialog-request-close : CustomEvent<{
    source: "close-button" | "keyboard" | "backdrop";
  }>`
  - `bl-dialog-close : CustomEvent<object>`
- **Slots:**
  - ``
  - `primary-action`
  - `secondary-action`
  - `tertiary-action`
- **CSS Custom Properties:**
  - `--bl-dialog-width`
  - `--bl-dialog-caption-line-clamp`

## `bl-drawer`

- **Properties/Attributes:**
  - `open : boolean`
  - `caption : string | undefined`
  - `embedUrl : string | undefined`
  - `externalLink : string | undefined`
  - `width : string`
  - `_drawerIframe : HTMLIFrameElement`
  - `domExistenceSchedule : number`
  - `resizeDrawerWidth`
  - `toggleDialogHandler`
  - `domExistence : boolean`
  - `closeDrawer`
  - `renderContent`
  - `renderContainer`
- **Events:**
  - `bl-drawer-open : CustomEvent<string>`
  - `bl-drawer-close : CustomEvent<string>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - `--bl-drawer-animation-duration`

## `bl-dropdown`

- **Properties/Attributes:**
  - `_popover : BlPopover`
  - `_button : BlButton`
  - `_isPopoverOpen : boolean`
  - `label : string`
  - `variant : ButtonVariant`
  - `kind : ButtonKind`
  - `size : ButtonSize`
  - `disabled : boolean`
  - `icon : string | undefined`
  - `opened`
  - `_handleClick`
  - `focusedOptionIndex : number`
  - `handleKeyDown`
  - `options : BlDropdownItem[]`
  - `open`
  - `close`
- **Events:**
  - `bl-dropdown-open : CustomEvent<string>`
  - `bl-dropdown-close : CustomEvent<string>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - (yok)

## `bl-dropdown-group`

- **Properties/Attributes:**
  - `caption : string | undefined`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-dropdown-item`

- **Properties/Attributes:**
  - `icon : BaklavaIcon | undefined`
  - `disabled : boolean`
  - `_handleClick`
  - `menuElement : BlButton`
  - `focus`
  - `BlDropdownGroupField : BlDropdownGroup | null`
  - `BlDropdownField : BlDropdown | null`
  - `BlSplitButtonField : BlSplitButton | null`
- **Events:**
  - `bl-dropdown-item-click : CustomEvent<string>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-icon`

- **Properties/Attributes:**
  - `_iconName : BaklavaIcon`
  - `name : BaklavaIcon`
  - `svg : string`
  - `load`
- **Events:**
  - `bl-load : CustomEvent<string>`
  - `bl-error : CustomEvent<string>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - `font-size`
  - `color`

## `bl-input`

- **Properties/Attributes:**
  - `shadowRootOptions : object`
  - `formControlValidators`
  - `validationTarget : HTMLInputElement`
  - `name : string | undefined`
  - `type : InputType`
  - `label : string | undefined`
  - `placeholder : string | undefined`
  - `value : string`
  - `required : boolean`
  - `minlength : number | undefined`
  - `maxlength : number | undefined`
  - `min : number | string | undefined`
  - `loading : boolean`
  - `max : number | string | undefined`
  - `pattern : string | undefined`
  - `step : number | undefined`
  - `autocomplete : HTMLInputElement["autocomplete"]`
  - `inputmode : HTMLInputElement["inputMode"]`
  - `autofocus : boolean`
  - `icon : BaklavaIcon | undefined`
  - `size : InputSize | undefined`
  - `disabled : boolean`
  - `readonly : boolean`
  - `labelFixed : boolean`
  - `customInvalidText : string`
  - `error : string`
  - `_customInvalidText : string`
  - `helpText : string | undefined`
  - `onKeydown`
  - `dirty : boolean`
  - `passwordVisible : boolean`
  - `textVisibilityToggle`
  - `handleSearchClear`
  - `showPicker`
  - `validityCallback`
  - `setCustomValidity`
  - `forceCustomError`
  - `clearCustomError`
  - `reportValidity`
  - `inputHandler`
  - `changeHandler`
  - `inputId`
  - `_hasIconSlot`
- **Events:**
  - `bl-change : CustomEvent<string>`
  - `bl-input : CustomEvent<string>`
  - `bl-invalid : CustomEvent<ValidityState>`
- **Slots:**
  - `icon`
- **CSS Custom Properties:**
  - `--bl-input-padding-start`
  - `--bl-input-padding-end`

## `bl-link`

- **Properties/Attributes:**
  - `href : HTMLAnchorElement["href"]`
  - `variant : LinkVariant`
  - `size : LinkSize`
  - `kind : LinkKind`
  - `ariaLabel : string`
  - `target : HTMLAnchorElement["target"]`
  - `rel : HTMLAnchorElement["rel"] | undefined`
  - `hreflang : HTMLAnchorElement["hreflang"] | undefined`
  - `type : HTMLAnchorElement["type"] | undefined`
  - `referrerPolicy : HTMLAnchorElement["referrerPolicy"] | undefined`
  - `download : HTMLAnchorElement["download"] | undefined`
  - `ping : HTMLAnchorElement["ping"] | undefined`
  - `isStandalone : boolean`
  - `renderIcon`
- **Events:**
  - (yok)
- **Slots:**
  - `icon`
- **CSS Custom Properties:**
  - `--bl-link-color`
  - `--bl-link-hover-color`
  - `--bl-link-active-color`

## `bl-notification`

- **Properties/Attributes:**
  - `noAnimation : boolean`
  - `duration : number`
  - `notifications : Notification[]`
  - `notificationList`
  - `touchStartY : number`
  - `touchStart`
  - `isMobile`
  - `addNotification`
  - `removeNotification`
  - `handleTouchStart`
  - `handleTouchMove`
  - `handleTouchEnd`
  - `renderActionSlot`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-notification-card`

- **Properties/Attributes:**
  - `caption : string`
  - `icon : boolean | BaklavaIcon`
  - `variant : NotificationVariant`
  - `duration : boolean`
  - `permanent : boolean`
  - `closed : boolean`
  - `setupDuration`
  - `close`
  - `handleClose`
  - `renderProgress`
- **Events:**
  - `bl-notification-card-request-close : CustomEvent<{
    source: "duration-ended" | "close-button";
  }>`
  - `bl-notification-card-close : CustomEvent<{
    source: "duration-ended" | "close-button";
  }>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-pagination`

- **Properties/Attributes:**
  - `currentPage : number`
  - `totalItems : number`
  - `itemsPerPage : number`
  - `hasJumper : boolean`
  - `jumperLabel : string | undefined`
  - `hasSelect : boolean`
  - `selectLabel : string | undefined`
  - `itemsPerPageOptions : array`
  - `pages : Array<number | string>`
  - `_paginate`
  - `_changePage`
  - `_pageBack`
  - `_pageForward`
  - `_getLastPage`
  - `_inputHandler`
  - `_selectHandler`
  - `_renderSinglePage`
  - `renderPages`
- **Events:**
  - `bl-change : CustomEvent<{
    selectedPage: number;
    prevPage: number;
    itemsPerPage: number;
  }>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-popover`

- **Properties/Attributes:**
  - `placement : Placement`
  - `fitSize : boolean`
  - `offset : number`
  - `_popover : HTMLElement`
  - `arrow : HTMLElement`
  - `popoverAutoUpdateCleanup : () => void`
  - `_target : string | Element`
  - `target : string | Element`
  - `_visible : boolean`
  - `visible : boolean`
  - `show`
  - `hide`
  - `getMiddleware`
  - `_handleClickOutside`
  - `setPopover`
  - `_handlePopoverShowEvent`
  - `_handleKeydownEvent`
- **Events:**
  - `bl-popover-show : CustomEvent<string>`
  - `bl-popover-hide : CustomEvent<string>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - `--bl-popover-arrow-display`
  - `--bl-popover-background-color`
  - `--bl-popover-border-color`
  - `--bl-popover-border-size`
  - `--bl-popover-padding`
  - `--bl-popbover-border-radius`
  - `--bl-popover-max-width`
  - `--bl-popover-position`

## `bl-progress-indicator`

- **Properties/Attributes:**
  - `wrapper : HTMLElement`
  - `size : ProgressIndicatorSize`
  - `failed : boolean`
  - `max`
  - `value`
  - `_max : number`
  - `_value : number`
  - `updateCssVariable`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - `--bl-progress-indicator-transition-duration`

## `bl-radio`

- **Properties/Attributes:**
  - `name : string`
  - `value : string`
  - `disabled : boolean`
  - `selected : boolean`
  - `select`
  - `checked`
  - `radioElement : HTMLElement`
  - `focus`
  - `blur`
  - `handleFieldValueChange`
  - `field : BlRadioGroup | null`
- **Events:**
  - `bl-checked : CustomEvent<string>`
  - `bl-focus : CustomEvent<string>`
  - `bl-blur : CustomEvent<string>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - `--bl-radio-align-items`

## `bl-radio-group`

- **Properties/Attributes:**
  - `label : string`
  - `value : string`
  - `required : boolean`
  - `options : BlRadio[]`
  - `availableOptions : BlRadio[]`
  - `focusedOptionIndex : number`
  - `handleOptionChecked`
  - `handleKeyDown`
  - `handleFocus`
- **Events:**
  - `bl-radio-change : CustomEvent<string>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - `--bl-radio-direction`
  - `--bl-radio-group-cross-axis-item-alignment`
  - `--bl-radio-group-cross-axis-content-alignment`
  - `--bl-radio-group-main-axis-content-alignment`

## `bl-select`

- **Properties/Attributes:**
  - `shadowRootOptions : object`
  - `formControlValidators : array`
  - `name : string`
  - `_value : ValueType | ValueType[] | null`
  - `_initialValue : ValueType | ValueType[] | null`
  - `value : ValueType | ValueType[] | null`
  - `shouldFormValueUpdate`
  - `label : string | undefined`
  - `placeholder : string | undefined`
  - `size : SelectSize`
  - `required : boolean`
  - `disabled : boolean`
  - `clearable : boolean`
  - `multiple : boolean`
  - `autofocus : boolean`
  - `labelFixed : boolean`
  - `helpText : string | undefined`
  - `customInvalidText : string | undefined`
  - `viewSelectAll : boolean`
  - `selectAllText : string | undefined`
  - `searchBar : boolean`
  - `searchBarPlaceholder : string | undefined`
  - `searchBarLoadingState : boolean`
  - `searchNotFoundText : string | undefined`
  - `popoverClearSearchText : string | undefined`
  - `_isPopoverOpen : boolean`
  - `_additionalSelectedOptionCount : number`
  - `_searchText : string`
  - `selectedOptionsContainer : HTMLElement`
  - `selectedOptionsItems : NodeListOf<HTMLElement>`
  - `_popover : HTMLElement`
  - `_selectInput : HTMLElement`
  - `userLang`
  - `_connectedOptions : BlSelectOption<ValueType>[]`
  - `_cleanUpPopover : CleanUpFunction | null`
  - `setOptionsSelected`
  - `options`
  - `opened`
  - `noResultFound`
  - `_selectedOptions : BlSelectOption<ValueType>[]`
  - `dirty : boolean`
  - `selectedOptions : BlSelectOption<ValueType>[]`
  - `additionalSelectedOptionCount`
  - `validityCallback`
  - `reportValidity`
  - `resetFormControl`
  - `validationTarget : HTMLElement`
  - `open`
  - `close`
  - `_interactOutsideHandler`
  - `_setupPopover`
  - `_handleToggleButtonClick`
  - `inputTemplate`
  - `selectAllTemplate`
  - `focusedOptionIndex : number`
  - `lastKeyPressedTime : number`
  - `typedCharacters : string`
  - `keyPressThreshold : number`
  - `handleFocusOptionByKey`
  - `handleKeydown`
  - `_togglePopover`
  - `_handleSelectEvent`
  - `_handleSearchEvent`
  - `_handleSearchOptions`
  - `_handleLastVisibleSearchedOption`
  - `_handleSingleSelect`
  - `_handleMultipleSelect`
  - `_handleSelectOptionEvent`
  - `_handleSelectAll`
  - `_onClickRemove`
  - `_checkAdditionalItemCount`
  - `registerOption`
  - `unregisterOption`
- **Events:**
  - `bl-select : CustomEvent<ISelectOption<ValueType>[] | ISelectOption<ValueType>>`
  - `bl-search : CustomEvent<string>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - `--bl-popover-position`

## `bl-select-option`

- **Properties/Attributes:**
  - `_value : ValueType`
  - `value : ValueType`
  - `label : string`
  - `disabled : boolean`
  - `selected : boolean`
  - `icon : BaklavaIcon | undefined`
  - `multiple : boolean`
  - `focusTarget : HTMLElement`
  - `focus`
  - `blur`
  - `blSelect : BlSelect<ValueType> | null`
  - `singleOptionTemplate`
  - `checkboxOptionTemplate`
  - `handleKeydown`
  - `_handleEvent`
  - `_onClickOption`
  - `_onCheckboxChange`
- **Events:**
  - `bl-select-option : CustomEvent<ValueType | string | null>`
  - `bl-focus : CustomEvent<ValueType | string | null>`
  - `bl-blur : CustomEvent<ValueType | string | null>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-spinner`

- **Properties/Attributes:**
  - `size : string`
  - `disabled : boolean`
  - `overlay : boolean`
  - `color : string`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-split-button`

- **Properties/Attributes:**
  - `trigger : ReferenceElement`
  - `_popover : BlPopover`
  - `mainButton : BlButton`
  - `dropdownButton : BlButton`
  - `_isPopoverOpen : boolean`
  - `label : string`
  - `variant : Exclude<ButtonVariant, "tertiary">`
  - `kind : ButtonKind`
  - `size : ButtonSize`
  - `href : string`
  - `disabled : boolean`
  - `loading : boolean`
  - `loadingLabel : string`
  - `dropdownDisabled : boolean`
  - `icon : BaklavaIcon | undefined`
  - `target : TargetType | undefined`
  - `type : "submit"`
  - `autofocus : boolean`
  - `form : HTMLFormElement | string`
  - `opened`
  - `_handleClick`
  - `_handlePrimaryClick`
  - `focusedOptionIndex : number`
  - `handleKeyDown`
  - `options : BlDropdownItem[]`
  - `open`
  - `close`
- **Events:**
  - `bl-dropdown-open : CustomEvent<string>`
  - `bl-dropdown-close : CustomEvent<string>`
  - `bl-click : CustomEvent<string>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - (yok)

## `bl-stepper`

- **Properties/Attributes:**
  - `type : StepperType`
  - `direction : StepperDirection`
  - `usage : StepperUsage`
  - `stepperItemsArray : BlStepperItemElement[]`
  - `totalSteps : number`
  - `activeStep : number`
  - `handleItemClick`
  - `handleKeyDown`
  - `updateStepperItems`
- **Events:**
  - `bl-stepper-change : CustomEvent<{
    activeStep: number;
    totalSteps: number;
  }>`
- **Slots:**
  - `default`
- **CSS Custom Properties:**
  - (yok)

## `bl-stepper-item`

- **Properties/Attributes:**
  - `id : string`
  - `variant : StepperItemVariant`
  - `disabled : boolean`
  - `icon : BaklavaIcon`
  - `title : string`
  - `description : string`
  - `isClickable : boolean`
  - `handleClick`
  - `handleKeyDown`
  - `handleMouseEnter`
  - `handleMouseLeave`
- **Events:**
  - `bl-stepper-item-click : CustomEvent<string>`
- **Slots:**
  - `default`
- **CSS Custom Properties:**
  - (yok)

## `bl-switch`

- **Properties/Attributes:**
  - `checked : boolean`
  - `disabled : boolean`
  - `toggle`
  - `handleKeyDown`
- **Events:**
  - `bl-switch-toggle : CustomEvent<boolean>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - `--bl-switch-color-on`
  - `--bl-switch-color-off`
  - `--bl-switch-animation-duration`

## `bl-tab`

- **Properties/Attributes:**
  - `tabGroup : BlTabGroup | null`
  - `caption : string`
  - `name : string`
  - `helpText : string`
  - `icon : BaklavaIcon | undefined`
  - `notify : boolean`
  - `badge : string`
  - `selected : boolean`
  - `disabled : boolean`
  - `tab : HTMLButtonElement`
  - `select`
  - `focus`
- **Events:**
  - `bl-tab-selected : CustomEvent<string>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - (yok)

## `bl-tab-group`

- **Properties/Attributes:**
  - `_connectedTabs : BlTab[]`
  - `_connectedPanels : BlTabPanel[]`
  - `_tabFocus : number`
  - `tabs`
  - `panels`
  - `registerTab`
  - `unregisterTab`
  - `registerTabPanel`
  - `unregisterTabPanel`
  - `_selectedTabName : string`
  - `selectedTabName`
  - `_handleTabSelected`
  - `_handleTabListKeyDown`
- **Events:**
  - (yok)
- **Slots:**
  - `tabs`
  - ``
- **CSS Custom Properties:**
  - (yok)

## `bl-tab-panel`

- **Properties/Attributes:**
  - `tabGroup : BlTabGroup | null`
  - `hidden : boolean`
  - `tab : string`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-table`

- **Properties/Attributes:**
  - `selected : string[]`
  - `selectable : boolean`
  - `multiple : boolean`
  - `sortable : boolean`
  - `stickyFirstColumn : boolean`
  - `stickyLastColumn : boolean`
  - `sortKey : string`
  - `sortDirection : SortDirection`
  - `_selectedValues : string[]`
  - `_sortKey : string`
  - `_sortDirection : SortDirection`
  - `tableRows`
  - `isFirstColumnSticky`
  - `isLastColumnSticky`
  - `isSelectable`
  - `isRowSelected`
  - `isAllSelected`
  - `isAnySelected`
  - `isAllUnselectedDisabled`
  - `onSelectionChange`
  - `handleHeaderSelection`
  - `handleRowSelection`
  - `notifyRowSelectionChange`
  - `addSelection`
  - `removeSelection`
  - `getSelectedValuesFromRows`
  - `resetScrollPosition`
  - `onSortChange`
- **Events:**
  - `bl-sort : CustomEvent<string[]>`
  - `bl-row-select : CustomEvent<string[]>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - (yok)

## `bl-table-body`

- **Properties/Attributes:**
  - `_table`
  - `hasTableRows`
- **Events:**
  - (yok)
- **Slots:**
  - `no-data`
- **CSS Custom Properties:**
  - (yok)

## `bl-table-cell`

- **Properties/Attributes:**
  - `disableSelection : boolean`
  - `_table`
  - `_tableRow`
  - `disabled`
  - `selectable`
  - `index`
  - `selectionKey : string`
  - `checked`
  - `shadowRight`
  - `shadowLeft`
  - `onChange`
  - `_renderCheckbox`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-table-header`

- **Properties/Attributes:**
  - `sticky : boolean`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-table-header-cell`

- **Properties/Attributes:**
  - `sortKey : string`
  - `_table`
  - `_tableRow`
  - `selectable`
  - `sortable`
  - `index`
  - `checked`
  - `indeterminate`
  - `isAllUnselectedDisabled`
  - `sortDirection : string`
  - `sortIconName : BaklavaIcon`
  - `shadowRight`
  - `shadowLeft`
  - `onChange`
  - `onSort`
  - `_renderCheckbox`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - `--bl-table-header-cell-width`
  - `--bl-table-header-cell-min-width`

## `bl-table-row`

- **Properties/Attributes:**
  - `selectionKey : string`
  - `_table`
  - `_firstTableCell`
  - `disabled`
  - `checked`
  - `stickyFirstColumn`
  - `stickyLastColumn`
- **Events:**
  - (yok)
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-tag`

- **Properties/Attributes:**
  - `size : TagSize`
  - `variant : TagVariant`
  - `icon : BaklavaIcon | undefined`
  - `selected : boolean`
  - `disabled : boolean`
  - `value : string | null`
  - `_handleClick`
  - `_removeButtonTemplate`
  - `_iconTemplate`
- **Events:**
  - `bl-tag-click : CustomEvent<{
    value: string | null;
    selected: boolean;
  }>`
- **Slots:**
  - ``
- **CSS Custom Properties:**
  - (yok)

## `bl-textarea`

- **Properties/Attributes:**
  - `shadowRootOptions : object`
  - `formControlValidators`
  - `validationTarget : HTMLTextAreaElement`
  - `error : string`
  - `name : string`
  - `required : boolean`
  - `disabled : boolean`
  - `expand : boolean`
  - `maxRows : number | undefined`
  - `size : TextareaSize | undefined`
  - `label : string | undefined`
  - `labelFixed : boolean`
  - `placeholder : string | undefined`
  - `characterCounter : boolean`
  - `helpText : string | undefined`
  - `customInvalidText : string | undefined`
  - `minlength : number | undefined`
  - `maxlength : number | undefined`
  - `value : string`
  - `rows : number | undefined`
  - `inputmode : "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"`
  - `autofocus : boolean`
  - `autocomplete : string`
  - `spellchecker : "true" | "false"`
  - `customScrollHeight : string | null`
  - `inputId`
  - `onError`
  - `inputHandler`
  - `changeHandler`
  - `setCustomValidity`
  - `reportValidity`
  - `valueChangedCallback`
  - `validityCallback`
  - `autoResize`
  - `dirty : boolean`
- **Events:**
  - `bl-input : CustomEvent<string>`
  - `bl-change : CustomEvent<string>`
  - `bl-invalid : CustomEvent<ValidityState>`
- **Slots:**
  - (yok)
- **CSS Custom Properties:**
  - (yok)

## `bl-tooltip`

- **Properties/Attributes:**
  - `trigger : ReferenceElement`
  - `_popover : BlPopover`
  - `placement : Placement`
  - `target : string | Element`
  - `_addEvents`
  - `_removeEvents`
  - `show`
  - `hide`
  - `visible : boolean`
  - `triggerTemplate`
- **Events:**
  - `bl-tooltip-show : CustomEvent<string>`
  - `bl-tooltip-hide : CustomEvent<string>`
- **Slots:**
  - ``
  - `tooltip-trigger`
- **CSS Custom Properties:**
  - `--bl-tooltip-trigger-display`