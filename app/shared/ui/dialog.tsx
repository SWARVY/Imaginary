import type { PropsWithChildren } from 'react';

interface DialogProps extends PropsWithChildren {
  id: string;
}

export default function Dialog({ id, children }: DialogProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>취소</button>
      </form>
    </dialog>
  );
}
