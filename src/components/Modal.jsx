'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useRouter } from 'next/navigation'; // Para navegação

export default function Modal({ isOpen, onClose }) {
  const [linkPixieset, setLinkPixieset] = useState('');
  const [clientName, setClientName] = useState('');
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (linkPixieset && clientName && pin) {
      const encodedName = encodeURIComponent(clientName);
      const encodedLink = encodeURIComponent(linkPixieset);
      const encodedPin = encodeURIComponent(pin);

      // Gerar o link do domínio próprio
      const domainLink = `https://www.capturethevibes.com/thank-you/${encodedName}?link=${encodedLink}&pin=${encodedPin}`;

      // Copia o texto para a área de transferência
      const message = `Hi ${clientName}!
I loved our photoshoot and meeting you 🤗. I hope you had a wonderful time! Now you’ll have that special moment to cherish forever ✨.

Here’s the link where you can view and download the photos:
👉 ${domainLink}

You can download them using this PIN: ${pin}

I hope you love them! 😄 Let me know if you need anything else 📸✨.`;

      navigator.clipboard.writeText(message).then(() => {
        alert('Text copied to clipboard!');
      });

      // Navega para a página dinâmica com os dados
      router.push(domainLink);
      onClose(); // Fecha o modal
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <DialogPanel className="relative bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
              Nombre del cliente
            </label>
            <input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Juan Pérez"
              className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="linkPixieset" className="block text-sm font-medium text-gray-700">
              Link Pixieset
            </label>
            <input
              id="linkPixieset"
              value={linkPixieset}
              onChange={(e) => setLinkPixieset(e.target.value)}
              placeholder="https://pixieset.com/..."
              className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
              PIN
            </label>
            <input
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="1234"
              className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Submeter
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
