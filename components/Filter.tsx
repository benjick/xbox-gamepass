import { SortKey, sorts, useCategories, useStore } from "../src/state";

function useFilter() {
  return useStore((state) => ({
    sort: state.sort,
    setSort: state.setSort,
    showHidden: state.showHidden,
    setShowHidden: state.setShowHidden,
  }));
}

export const Filter: React.FC = () => {
  const { setSort, sort, showHidden, setShowHidden } = useFilter();
  const { categories, setCategory, category } = useCategories();

  return (
    <div className="p-3">
      <div className="flex flex-row">
        <div className="w-64 mr-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="ALL">All categories</option>
            {categories.sort().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-64">
          <label
            htmlFor="sortBy"
            className="block text-sm font-medium text-gray-700"
          >
            Sort by
          </label>
          <select
            id="sortBy"
            name="sortBy"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            {Object.entries(sorts).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative flex items-start pt-3">
        <div className="flex items-center h-5">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            checked={showHidden}
            onChange={(event) => setShowHidden(event.target.checked)}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            Show hidden games
          </label>
          <span id="comments-description" className="text-gray-500">
            <span className="sr-only">Show hidden games</span>
          </span>
        </div>
      </div>
    </div>
  );
};
