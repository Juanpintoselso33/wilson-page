import { Dialog, Transition } from '@headlessui/react'
import { ArrowDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'

import { MediaItem } from '@/types/mediaItem.types'

interface VideoModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  mediaItem: MediaItem
}

function VideoModal({ isOpen, setIsOpen, mediaItem }: VideoModalProps) {
  if (!mediaItem) return null

  const downloadVideo = () => {
    const link = document.createElement('a')
    link.href = mediaItem.mediaFiles[0].file
    link.setAttribute('download', mediaItem.name || 'download') // Provide a default name if video.name is undefined
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex items-center justify-between text-xl font-semibold leading-6 text-gray-900"
                >
                  {mediaItem.name}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md text-cyan-800 hover:text-cyan-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>
                <div className="my-4 border-t border-gray-200" />
                <div className="mt-2">
                  <p className="mb-2 text-sm text-gray-500">
                    {mediaItem.description}
                  </p>
                  <p className="mb-1 text-sm text-cyan-800">
                    Category: {mediaItem.category}
                  </p>
                  <p className="mb-1 text-sm text-gray-500">
                    Uploaded on: {mediaItem.created_at || 'Date not available'}
                  </p>
                  <p className="mb-4 text-sm text-gray-500">
                    Creator: {mediaItem.creator || 'Unknown'}
                  </p>
                </div>
                <div className="my-4 border-t border-gray-200" />
                <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-black">
                  <video controls className="h-full w-full">
                    <source
                      src={mediaItem.mediaFiles[0].file}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={downloadVideo}
                    className="inline-flex items-center justify-center rounded-md bg-cyan-800 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                  >
                    <ArrowDownIcon className="mr-2 h-5 w-5" /> Download
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default VideoModal
