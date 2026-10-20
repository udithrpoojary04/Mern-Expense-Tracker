import React from 'react';

function FilterBar({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  categoriesList,
  onResetFilters,
}) {
  const isFiltered = searchQuery !== '' || filterType !== 'all' || filterCategory !== 'all';

  return (
    <div className="card filter-card">
      <div className="filter-grid">
        {/* Search by title */}
        <div className="filter-group flex-2">
          <label className="filter-label" htmlFor="search-input">
            🔍 Search by Title
          </label>
          <input
            id="search-input"
            type="text"
            className="form-input"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter by Type */}
        <div className="filter-group flex-1">
          <label className="filter-label" htmlFor="type-filter">
            Type
          </label>
          <select
            id="type-filter"
            className="form-input"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </div>

        {/* Filter by Category */}
        <div className="filter-group flex-1">
          <label className="filter-label" htmlFor="category-filter">
            Category
          </label>
          <select
            id="category-filter"
            className="form-input"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filter Button */}
        {isFiltered && (
          <div className="filter-group filter-actions">
            <button
              type="button"
              className="btn btn-outline btn-clear"
              onClick={onResetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
