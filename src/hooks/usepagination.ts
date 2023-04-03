import { reactive, type ComputedRef, type Ref, watchEffect } from 'vue';

export default function usePagination<T>(
  items: ComputedRef<T[] | undefined>,
  itemsPerPage: number
) {
  const pagination = reactive({
    currentItems: [] as unknown as Ref<T[]>,
    currentPage: 1,
    pageCount: 1,
  });
  if (items.value === undefined) return pagination;

  watchEffect(() => {
    if (items.value === undefined) return;

    const startOffset =
      pagination.currentPage === 1 ? 0 : (pagination.currentPage - 1) * itemsPerPage;
    const endOffset = startOffset + itemsPerPage;
    const paginatedItems = items.value.slice(startOffset, endOffset);

    pagination.currentItems = paginatedItems.length > 0 ? paginatedItems : items.value;
    pagination.pageCount = Math.ceil(items.value.length / itemsPerPage);
  });

  return pagination;
}
