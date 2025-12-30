"use client"
import { useState } from "react"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Types
export type DateFilterName = "Today" | "Yesterday" | "Last 7 Days" | "Last 30 Days" | "Last 90 Days" | "Date Range" | "All"

// Timeframe options data
const timeframeOptions: { id: string; name: DateFilterName }[] = [
  { id: "all", name: "All"},
  { id: "today", name: "Today" },
  { id: "yesterday", name: "Yesterday" },
  { id: "last_7_days", name: "Last 7 Days" },
  { id: "last_30_days", name: "Last 30 Days" },
  { id: "last_90_days", name: "Last 90 Days" },
  { id: "date_range", name: "Date Range" },
]

// Helper function
const findNameByIdInDropdown = (options: { id: string; name: DateFilterName }[], id: string): DateFilterName => {
  const option = options.find((opt) => opt.id === id)
  return option?.name || "Last 7 Days"
}

const findIdByName = (options: { id: string; name: DateFilterName }[], name: DateFilterName): string => {
  const option = options.find((opt) => opt.name === name)
  return option?.id || "last_7_days"
}

interface TimeframeFilterProps {
  timeframe: DateFilterName
  customRange: { start: Date | null; end: Date | null }
  setTimeframe: (filter: DateFilterName) => void
  setCustomRange: (range: { start: Date | null; end: Date | null }) => void
  onTimeframeChange: (filter: {
    timeframe: DateFilterName
    range: { start: Date | null; end: Date | null }
  }) => void
}

export function TimeframeFilter({
  timeframe,
  customRange,
  setTimeframe,
  setCustomRange,
  onTimeframeChange,
}: TimeframeFilterProps) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [error, setError] = useState("")

  const handleTimeframeChange = (value: string) => {
    const selectedTimeRange = findNameByIdInDropdown(timeframeOptions, value)
    setCustomRange({ start: null, end: null })
    setTimeframe(selectedTimeRange)
    setDropdownOpen(false)

    if (selectedTimeRange !== "Date Range") {
      onTimeframeChange({
        timeframe: selectedTimeRange,
        range: { start: null, end: null },
      })
    }
  }

  const handleDateChange = (key: "start" | "end", date: Date | undefined) => {
    setError("")
    setCustomRange({
      ...customRange,
      [key]: date || null,
    })
  }

  const handleApplyCustomRange = () => {
    if (!customRange.start || !customRange.end) {
      setError("Please select both start and end dates.")
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const startDate = new Date(customRange.start)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(customRange.end)
    endDate.setHours(0, 0, 0, 0)

    if (startDate.getTime() === today.getTime()) {
      setError("Start date cannot be today.")
      return
    }

    if (startDate > today) {
      setError("Start date cannot be in the future.")
      return
    }

    if (endDate > today) {
      setError("End date cannot be in the future.")
      return
    }

    if (endDate < startDate) {
      setError("End date must be after start date.")
      return
    }

    setError("")
    onTimeframeChange({
      timeframe: "Date Range",
      range: customRange,
    })
    setPopoverOpen(false)
  }

  const handleClosePopover = () => {
    setPopoverOpen(false)
    setError("")
  }

  const sharedButtonStyles =
    "h-[38px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"

  return (
    <div className="flex items-center gap-2">
      <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <PopoverTrigger asChild>
          <button type="button" className={cn(sharedButtonStyles, "flex w-[180px] items-center justify-between")}>
            <span>{timeframe}</span>
            <ChevronDown
              className={cn(
                "ml-2 h-4 w-4 text-gray-400 transition-transform duration-200",
                dropdownOpen && "rotate-180",
              )}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0" align="start">
          <ul className="max-h-60 overflow-auto py-1">
            {timeframeOptions.map((option) => {
              const isSelected = timeframe === option.name
              return (
                <li
                  key={option.id}
                  className={cn(
                    "relative cursor-pointer select-none px-3 py-2 text-sm",
                    isSelected ? "bg-indigo-50 text-indigo-900" : "text-gray-900 hover:bg-indigo-100",
                  )}
                  onClick={() => handleTimeframeChange(option.id)}
                >
                  <span className="block truncate font-medium">{option.name}</span>
                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </PopoverContent>
      </Popover>

      {timeframe === "Date Range" && (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button type="button" className={cn(sharedButtonStyles, "flex items-center gap-2")}>
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>
                {customRange.start ? format(customRange.start, "MMM d, yyyy") : "Start"} -{" "}
                {customRange.end ? format(customRange.end, "MMM d, yyyy") : "End"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="end">
            <p className="mb-3 text-sm font-medium">Select Date Range</p>

            <div className="flex gap-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Start Date</p>
                <Calendar
                  mode="single"
                  selected={customRange.start || undefined}
                  onSelect={(date) => handleDateChange("start", date)}
                  disabled={(date) => date > new Date() || (customRange.end ? date > customRange.end : false)}
                  initialFocus
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">End Date</p>
                <Calendar
                  mode="single"
                  selected={customRange.end || undefined}
                  onSelect={(date) => handleDateChange("end", date)}
                  disabled={(date) => date > new Date() || (customRange.start ? date < customRange.start : false)}
                />
              </div>
            </div>

            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

            <div className="mt-4 flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={handleClosePopover}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleApplyCustomRange} className="text-white">
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

export default TimeframeFilter