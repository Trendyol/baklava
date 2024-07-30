## Figma Design Document

https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?type=design&node-id=25-3609&mode=design&t=kAQMF52rg1QrGuhJ-0

## Implementation

```html
<bl-table
    selectable
    multiple
    select-value="list of selected row indexes"
>
    <bl-table-header sticky>
        <bl-table-row>
            <bl-table-header-cell
                sortable
                sort-key
                sort-direction
            >
                Header 1
            </bl-table-header-cell>
            <bl-table-header-cell>
                Header 2
            </bl-table-header-cell>
        </bl-table-row>
    </bl-table-header>
    <bl-table-body>
        <bl-table-row disable-selection>
            <bl-table-cell>
                row 1 data 1
            </bl-table-cell>
            <bl-table-cell>row 1 data 2</bl-table-cell>
        </bl-table-row>
        <bl-table-row>
            <bl-table-cell>row 2 data 1</bl-table-cell>
            <bl-table-cell>row 2 data 2</bl-table-cell>
        </bl-table-row>
    </bl-table-body>
</bl-table>
```
___
### API Reference:

#### bl-table component

Properties

 **Property**                        | **Description**                        | **Default Value**
-------------------------------------|----------------------------------------|-------------------
 selectable (`boolean`)              | Sets table rows to be selectable       | `false`
 multiple (`boolean`)                | Set multiple table rows as selectable  | `false`
 select-value (`number[]` \| `null`) | Selected rows index value as number    | `null`


Events

**Event**               | **Description**
------------------------|---------------------------------------------
bl-table-sort           | Will be triggered once user change table sort
bl-table-row-select     | Will be triggered once user make a row selection/unselection


___
#### bl-table-header component

Properties

**Property**                | **Description**             | **Default Value**
----------------------------|-----------------------------|-------------------
sticky (`boolean`)          | Sets table header as sticky | `false`


___
#### bl-table-header-cell

Properties

 **Property**                                   | **Description**                    | **Default Value**
------------------------------------------------|------------------------------------|-------------------
 sticky (`"start"` \| `"end"` \| `null`)        | Sets table column as sticky        | `null`
 sortable (`boolean`)                           | Sets table column as sortable      | `false`
 sort-key (`string` \| `number` \| `null`)      | Set key value for column           | `null`
 sort-direction (`"asc"` \| `"desc"` \| `null`) | Set sorting type for sorted column | `null`


CSS Attributes

**Attribute**                          | **Description**
---------------------------------------|--------------------------------------
bl-table-header-cell-width (`number`)  | Set table header cell width



___
#### bl-table-row component

Properties

**Property**                       | **Description**                                     | **Default Value**
-----------------------------------|-----------------------------------------------------|-------------------
disable-selection (`boolean`)      | Sets table row selection checkbox as disable state. | `false`



