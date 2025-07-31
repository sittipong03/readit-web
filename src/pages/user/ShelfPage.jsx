import { useState } from "react";

function Shelf() {
  const [activeTab, setActiveTab] = useState("readlist");

  const renderContent = () => {
    switch (activeTab) {
      case "readlist":
        return (
          <div className="flex h-full w-[900px] flex-col justify-between">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div className="text-text-secondary">
                <p className="subtitle-1">Readlist</p>
              </div>
              <div className="bg-primary-main text-primary-contrast font-button line-height-labalMedium tracking-labelMedium rounded-full px-4 py-2">
                <button>+ Add Book</button>
              </div>
            </div>
            <div className="shadow-card-3d flex h-[608px] justify-center rounded-lg p-6">
              <div className="flex h-[360px] flex-col items-center justify-between">
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                  <p className="subtitle-2">Reading (0/3)</p>
                </div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                  <p className="subtitle-2">Wishlists</p>
                </div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
              </div>
            </div>
          </div>
        );

      case "read":
        return (
          <div className="flex h-full w-[900px] flex-col justify-between">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div className="text-text-secondary">
                <p className="subtitle-1">Read</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-primary-soft text-primary-main border-primary-main font-button line-height-labalMedium border- rounded-full border-1 px-4 py-2">
                  Filter
                </button>
                <button className="bg-primary-soft text-primary-main border-primary-main font-button line-height-labalMedium border- rounded-full border-1 px-4 py-2">
                  Sort by: Latest Date
                </button>
                <button className="bg-primary-main text-primary-contrast font-button line-height-labalMedium tracking-labelMedium rounded-full px-4 py-2">
                  + Add Book
                </button>
              </div>
            </div>
            <div className="shadow-card-3d flex h-[608px] justify-center rounded-lg p-6">
              {/* <div className="flex h-[360px] flex-col items-center justify-between">
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                  <p className="subtitle-2">Reading (0/3)</p>
                </div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                  <p className="subtitle-2">Favorites</p>
                </div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
              </div> */}
            </div>
          </div>
        );

      case "favorites":
        return (
          <div className="flex h-full w-[900px] flex-col justify-between gap-2">
            <div className="flex h-[64px] w-full items-center justify-between">
              <div className="text-text-secondary line-height-bodyLarge flex flex-col gap-2">
                <p className="subtitle-1">Favorites</p>
                <p className="body-1">
                  Only books that have been reviewed can be marked as favorites.
                </p>
              </div>
            </div>
            <div className="shadow-card-3d mt-4 flex h-[608px] justify-center rounded-lg p-6">
              <div className="flex h-[360px] flex-col items-center justify-between">
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2"></div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2"></div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-[888px] w-full flex-col items-center justify-center">
      <div className="bg-paper-elevation-6 flex h-full w-full justify-center">
        <div className="border-action-active flex h-[824px] w-[1280px] items-center justify-center">
          <div className="flex h-[740px] w-[1180px] flex-col justify-between">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div>
                <p className="h6 text-text-primary">Your Shelves</p>
              </div>
              <div className="bg-primary-soft text-primary-main border-primary-main font-button line-height-labalMedium border- rounded-full border-1 px-4 py-2">
                <button>Back to my feed</button>
              </div>
            </div>
            <div className="flex h-[668px] w-full justify-between">
              {/* <div className="flex h-[160px] w-[240px] flex-col justify-between">
                <div className="bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="subtitle-3">Readlist</button>
                </div>
                <div className="font-weight-Subtitle font-titleSmall line-height-titlesmall tracking-titlesmall flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="body-1">Read</button>
                </div>
                <div className="font-titleSmall font-weight-Subtitle line-height-titlesmall tracking-titlesmall flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="body-1">Favorites</button>
                </div>
              </div> */}
              <aside className="h-40 w-64">
                <div>
                  <nav>
                    <ul className="space-y-2">
                      <li>
                        <button
                          onClick={() => setActiveTab("readlist")}
                          className={`flex h-[48px] w-full items-center rounded-xl px-4 py-2 ${
                            activeTab === "readlist"
                              ? "bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                              : "flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                          }`}
                        >
                          Readlist
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("read")}
                          className={`flex h-[48px] w-full items-center rounded-xl px-4 py-2 ${
                            activeTab === "read"
                              ? "bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                              : "flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                          }`}
                        >
                          Read
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("favorites")}
                          className={`flex h-[48px] w-full items-center rounded-xl px-4 py-2 ${
                            activeTab === "favorites"
                              ? "bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                              : "flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                          }`}
                        >
                          Favorites
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </aside>
              <div>{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shelf;
