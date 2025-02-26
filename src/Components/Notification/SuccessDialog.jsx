import { Dialog, Transition } from "@headlessui/react";

export default function SuccessDialog({ isOpen, onClose, onConfirm, message }) {
    return (
        <Transition appear show={isOpen} as="div">
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-30" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white rounded-lg p-6 shadow-lg max-w-md">
                        <Dialog.Title className="text-lg font-bold text-center">
                            Thanh toán thành công!
                        </Dialog.Title>
                        <p className="text-center mt-2 text-gray-600">{message}</p>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                                Về trang chủ
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
