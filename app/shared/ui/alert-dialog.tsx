import type { PropsWithChildren } from 'react';

interface AlertDialogProps extends PropsWithChildren {
  id: string;
  onClick: () => void;
}

export default function AlertDialog({
  id,
  onClick,
  children,
}: AlertDialogProps) {
  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box">
          {children}
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
