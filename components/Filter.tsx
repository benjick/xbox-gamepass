import { SortKey, sorts, useCategories, useStore } from "../src/state";

export const Filter: React.FC = () => {
  const { setSort, sort } = useStore((state) => ({
    sort: state.sort,
    setSort: state.setSort,
  }));

  const { categories, setCategory, category } = useCategories();

  return (
    <div className="flex flex-row">
      <div className="w-64">
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
          {categories.map((_category) => (
            <option key={_category} value={_category}>
              {_category}
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
  );
};
