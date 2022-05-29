export class PagedDataDTO {
  page: number
  pageSize: number
  totalPages: number
  totalElements: number

  constructor(page: number, pageSize: number, totalElements: number) {
    if (page !== undefined && pageSize !== undefined) this.page = page / pageSize + 1
    if (pageSize !== undefined) this.pageSize = Number(pageSize)
    if (totalElements !== undefined && pageSize !== undefined) this.totalPages = Math.ceil(totalElements / pageSize)
    if (totalElements !== undefined) this.totalElements = totalElements
  }
}
