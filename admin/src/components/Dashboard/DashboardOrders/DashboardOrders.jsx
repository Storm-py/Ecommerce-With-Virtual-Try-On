import React,{ useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"


const fetchOrders = async (endpoint) => {
  const res = await fetch(endpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
  const data = await res.json()
  if (!data?.success) return []
  return Array.isArray(data.data) ? data.data : []
}

const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" })

export default function DashboardOrders({
  endpoint = `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/orders`,
  initialPageSize = 6,
  pageSizeOptions = [6, 10, 20],
}) {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim().toLowerCase()), 300)
    return () => clearTimeout(t)
  }, [searchTerm])

  
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetchOrders(endpoint)
      .then((data) => {
        if (!isMounted) return
        setOrders(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!isMounted) return
        setError("Failed to fetch orders")
        console.log("orders fetch error:", err)
      })
      .finally(() => isMounted && setLoading(false))
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [endpoint])

  
  const filteredOrders = useMemo(() => {
    const byStatus = orders.filter((o) => (filter === "all" ? true : o.status === filter))
    const bySearch = debouncedSearch
      ? byStatus.filter((o) => {
          const id = String(o.id ?? "").toLowerCase()
          const track = String(o.tracking ?? "").toLowerCase()
          const status = String(o.status ?? "").toLowerCase()
          const date = String(o.date ?? "").toLowerCase()
          return (
            id.includes(debouncedSearch) ||
            track.includes(debouncedSearch) ||
            status.includes(debouncedSearch) ||
            date.includes(debouncedSearch)
          )
        })
      : byStatus

    return bySearch.sort((a, b) => {
      const da = new Date(a.date || 0).getTime()
      const db = new Date(b.date || 0).getTime()
      // Fallback to id string compare if invalid dates
      if (Number.isNaN(da) || Number.isNaN(db)) return String(b.id).localeCompare(String(a.id))
      return db - da
    })
  }, [orders, filter, debouncedSearch])

  
  const total = filteredOrders.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  useEffect(() => {
   
    setPage(1)
  }, [filter, debouncedSearch, pageSize])

  const currentStart = (page - 1) * pageSize
  const currentEnd = Math.min(total, page * pageSize)
  const visibleOrders = filteredOrders.slice(currentStart, currentEnd)

  const statusBadge = (status) => {
    const map = {
      delivered: "bg-green-100 text-green-800",
      processing: "bg-amber-100 text-amber-800",
      shipped: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      canceled: "bg-red-100 text-red-800",
    }
    return map[status] || "bg-gray-100 text-gray-800"
  }

  const SkeletonRow = () => (
    <tr>
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse ml-auto" />
      </td>
    </tr>
  )

  return (
    <div className="orders-page p-4 sm:p-6 lg:p-8 w-[60vw]">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-balance">My Orders</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">View and manage all your recent orders</p>
      </header>

      
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Order status filters">
            {[
              { key: "all", label: "All Orders" },
              { key: "processing", label: "Processing" },
              { key: "shipped", label: "Shipped" },
              { key: "delivered", label: "Delivered" },
              { key: "cancelled", label: "Cancelled" },
            ].map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff491f] ${
                  filter === f.key ? "bg-[#ff491f] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full">
            <label htmlFor="order-search" className="sr-only">
              Search orders
            </label>
            <input
              id="order-search"
              type="text"
              placeholder="Search by ID, tracking, status, or date..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff491f] focus:bg-white text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="page-size" className="text-sm text-gray-600">
              Per page
            </label>
            <select
              id="page-size"
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" role="table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </>
              )}

              {!loading && error && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-red-600">
                    {error}
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                visibleOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items} item{order.items !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {currency.format(Number(order.total || 0))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge(order.status)}`}
                      >
                        {String(order.status || "")
                          .charAt(0)
                          .toUpperCase() + String(order.status || "").slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.tracking}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-[#ff491f] hover:text-orange-700 mr-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff491f]"
                      >
                        View Details
                      </Link>
                      {String(order.status) === "processing" && (
                        <button
                          className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => window.confirm("Cancel this order?")}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

              {!loading && !error && visibleOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-600">
                    No orders to show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        <div className="lg:hidden">
          {loading && (
            <div className="p-4 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="col-span-2 h-3 w-40 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && <div className="p-6 text-center text-sm text-red-600">{error}</div>}

          {!loading &&
            !error &&
            visibleOrders.map((order) => (
              <div key={order.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{order.id}</h3>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${statusBadge(order.status)}`}
                  >
                    {String(order.status || "")
                      .charAt(0)
                      .toUpperCase() + String(order.status || "").slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Items:</span>
                    <span className="ml-1 text-gray-900">
                      {order.items} item{order.items !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Total:</span>
                    <span className="ml-1 font-medium text-gray-900">{currency.format(Number(order.total || 0))}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Tracking:</span>
                    <span className="ml-1 text-gray-900">{order.tracking}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-[#ff491f] hover:text-orange-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff491f]"
                  >
                    View Details
                  </Link>
                  {String(order.status) === "processing" && (
                    <button
                      className="text-red-600 hover:text-red-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => window.confirm("Cancel this order?")}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}

          {!loading && !error && visibleOrders.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-base font-medium text-gray-900">No orders found</h3>
              <p className="mt-2 text-gray-500 text-sm">
                {filter === "all" ? "You haven't placed any orders yet." : `You don't have any ${filter} orders.`}
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff491f] hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

     
      {total > 0 && (
        <nav
          className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 sm:px-6 py-4 mt-4 flex items-center justify-between"
          aria-label="Pagination"
        >
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{total === 0 ? 0 : currentStart + 1}</span> to{" "}
              <span className="font-medium">{currentEnd}</span> of <span className="font-medium">{total}</span> orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {pageCount}
            </span>
            <button
              className="inline-flex items-center px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page >= pageCount}
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </div>
  )
}
