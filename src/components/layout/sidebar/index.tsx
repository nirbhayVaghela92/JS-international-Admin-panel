"use client";

import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "./data";
import { MenuItem } from "./menu-item";
import { ChevronUp } from "@/assets/icon";
import { ArrowLeftIcon } from "@/assets/icon";
import { useSidebarContext } from "@/components/layout/sidebar/sidebar-context";

// hook to detect <1024px
function useBelowLg() {
  const [isBelowLg, setIsBelowLg] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsBelowLg(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isBelowLg;
}

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, toggleSidebar } = useSidebarContext();
  const isBelowLg = useBelowLg();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  useEffect(() => {
    NAV_DATA.some((section) => {
      return section.items.some((item) => {
        return item.items.some((subItem) => {
          if (subItem.url === pathname) {
            if (!expandedItems.includes(item.title)) {
              setExpandedItems((prev) => [...prev, item.title]);
            }
            return true;
          }
        });
      });
    });
  }, [pathname]);

  return (
    <>
      {/* Overlay only on mobile (<1024px) */}
      {isBelowLg && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "min-w-[235px] max-w-[235px] border-r border-gray-200 bg-white transition-transform duration-200 ease-linear",
          isBelowLg ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isBelowLg && !isOpen && "-translate-x-full",
        )}
        aria-label="Main navigation"
        aria-hidden={isBelowLg && !isOpen}
        inert={isBelowLg && !isOpen}
      >
        <div className="flex h-full flex-col pt-5">
          <div className="relative pr-4.5">
            <Link
              href={"/"}
              onClick={() => isBelowLg && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo className="!h-8" />
            </Link>

            {/* Toggle only visible <1024px */}
            {isBelowLg && (
              <button
                onClick={toggleSidebar}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {item.items.length ? (
                          <div>
                            <MenuItem
                              isActive={item.items.some(
                                ({ url }) =>
                                  url === pathname ||
                                  url.startsWith(pathname + "?"),
                              )}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpanded(item.title);
                              }}
                            >
                              <item.icon
                                className="size-6 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{item.title}</span>
                              <ChevronUp
                                className={cn(
                                  "ml-auto rotate-180 transition-transform duration-200",
                                  expandedItems.includes(item.title) &&
                                    "rotate-0",
                                )}
                                aria-hidden="true"
                              />
                            </MenuItem>

                            {expandedItems.includes(item.title) && (
                              <ul
                                className="ml-9 mr-0 space-y-1.5 pb-[15px] pr-0 pt-2"
                                role="menu"
                              >
                                {item.items.map((subItem) => (
                                  <li key={subItem.title} role="none">
                                    <MenuItem
                                      as="link"
                                      href={subItem.url}
                                      isActive={
                                        pathname === subItem.url ||
                                        subItem.url.startsWith(pathname + "?")
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <span>{subItem.title}</span>
                                    </MenuItem>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          (() => {
                            const href = item.url + "";
                            return (
                              <MenuItem
                                className="flex items-center gap-3 py-3"
                                as="link"
                                href={href}
                                isActive={
                                  pathname === href ||
                                  (href !== "/" &&
                                    (pathname.startsWith(href + "/") ||
                                      href.startsWith(pathname + "?")))
                                }
                              >
                                <item.icon
                                  className="size-6 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>{item.title}</span>
                              </MenuItem>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
