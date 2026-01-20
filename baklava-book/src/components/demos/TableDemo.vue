<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic Table -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Table</h4>
      <bl-table>
        <bl-table-header slot="header">
          <bl-table-header-cell>Name</bl-table-header-cell>
          <bl-table-header-cell>Email</bl-table-header-cell>
          <bl-table-header-cell>Role</bl-table-header-cell>
        </bl-table-header>
        <bl-table-body slot="body">
          <bl-table-row>
            <bl-table-cell>John Doe</bl-table-cell>
            <bl-table-cell>john@example.com</bl-table-cell>
            <bl-table-cell>Admin</bl-table-cell>
          </bl-table-row>
          <bl-table-row>
            <bl-table-cell>Jane Smith</bl-table-cell>
            <bl-table-cell>jane@example.com</bl-table-cell>
            <bl-table-cell>User</bl-table-cell>
          </bl-table-row>
          <bl-table-row>
            <bl-table-cell>Bob Wilson</bl-table-cell>
            <bl-table-cell>bob@example.com</bl-table-cell>
            <bl-table-cell>Editor</bl-table-cell>
          </bl-table-row>
        </bl-table-body>
      </bl-table>
    </div>

    <!-- Sortable Columns -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Sortable Columns</h4>
      <bl-table>
        <bl-table-header slot="header">
          <bl-table-header-cell sortable sort-key="name">Name</bl-table-header-cell>
          <bl-table-header-cell sortable sort-key="date">Date</bl-table-header-cell>
          <bl-table-header-cell sortable sort-key="status">Status</bl-table-header-cell>
        </bl-table-header>
        <bl-table-body slot="body">
          <bl-table-row>
            <bl-table-cell>Project Alpha</bl-table-cell>
            <bl-table-cell>2024-01-15</bl-table-cell>
            <bl-table-cell>
              <bl-badge style="--bl-badge-bg-color: #e7f9ef; --bl-badge-color: #0bc15c">
                Active
              </bl-badge>
            </bl-table-cell>
          </bl-table-row>
          <bl-table-row>
            <bl-table-cell>Project Beta</bl-table-cell>
            <bl-table-cell>2024-02-20</bl-table-cell>
            <bl-table-cell>
              <bl-badge style="--bl-badge-bg-color: #fff8e6; --bl-badge-color: #ffb600">
                Pending
              </bl-badge>
            </bl-table-cell>
          </bl-table-row>
          <bl-table-row>
            <bl-table-cell>Project Gamma</bl-table-cell>
            <bl-table-cell>2024-03-10</bl-table-cell>
            <bl-table-cell>
              <bl-badge style="--bl-badge-bg-color: #ffeeec; --bl-badge-color: #ff5043">
                Inactive
              </bl-badge>
            </bl-table-cell>
          </bl-table-row>
        </bl-table-body>
      </bl-table>
    </div>

    <!-- Selectable Rows -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Selectable Rows</h4>
      <bl-table selectable>
        <bl-table-header slot="header">
          <bl-table-header-cell>Product</bl-table-header-cell>
          <bl-table-header-cell>Price</bl-table-header-cell>
          <bl-table-header-cell>Stock</bl-table-header-cell>
        </bl-table-header>
        <bl-table-body slot="body">
          <bl-table-row selection-key="1">
            <bl-table-cell>Laptop</bl-table-cell>
            <bl-table-cell>$999</bl-table-cell>
            <bl-table-cell>50</bl-table-cell>
          </bl-table-row>
          <bl-table-row selection-key="2">
            <bl-table-cell>Mouse</bl-table-cell>
            <bl-table-cell>$29</bl-table-cell>
            <bl-table-cell>200</bl-table-cell>
          </bl-table-row>
          <bl-table-row selection-key="3">
            <bl-table-cell>Keyboard</bl-table-cell>
            <bl-table-cell>$79</bl-table-cell>
            <bl-table-cell>150</bl-table-cell>
          </bl-table-row>
        </bl-table-body>
      </bl-table>
    </div>
  </div>
</template>
