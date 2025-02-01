export default function openModal(id: string) {
  const modal = document.getElementById(id) as HTMLDialogElement | null;
  modal?.showModal();
}
