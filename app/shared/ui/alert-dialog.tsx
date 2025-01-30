import type { PropsWithChildren } from 'react';

interface AlertDialogProps extends PropsWithChildren {
  title: string;
  description: string;
  onClick: () => void;
}

export default function AlertDialog({
  title,
  description,
  onClick,
  children,
}: AlertDialogProps) {
  const openModal = () => {
    const modal = document.getElementById(
      'my_modal_1',
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <>
      <button onClick={openModal}>{children}</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action">
            <form method="dialog" className="grid grid-cols-2 gap-x-2">
              <button className="btn">취소</button>
              <button type="button" className="btn btn-error" onClick={onClick}>
                삭제
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
