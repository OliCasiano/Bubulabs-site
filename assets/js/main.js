// Selección de elementos
const openBtn  = document.getElementById('openCollections');
const dialog   = document.getElementById('collectionsDialog');
const closeBtn = dialog?.querySelector('.dialog-close');
const content  = document.getElementById('collectionsContent');

// Abrir diálogo y cargar vista externa
async function openCollectionsDialog(e){
  // Evita que el <a href="#..."> salte
  e?.preventDefault?.();

  if (content && !content.dataset.loaded) {
    try {
      const viewUrl = './assets/views/collections.html?v=' + Date.now(); // cache-bust
      const res = await fetch(viewUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const html = await res.text();
      content.innerHTML = html;
      content.dataset.loaded = 'true';
    } catch (err) {
      content.innerHTML = '<p style="color:#f88;margin:0">No se pudo cargar la vista.</p>';
    }
  }

  dialog?.showModal();
}

// Cerrar
function closeDialog(){ dialog?.close(); }

// Clics
openBtn?.addEventListener('click', openCollectionsDialog);
closeBtn?.addEventListener('click', closeDialog);

// Cerrar haciendo clic fuera de la tarjeta
dialog?.addEventListener('click', (e)=>{
  const card = dialog.querySelector('.dialog-card');
  if (!card) return;
  const r = card.getBoundingClientRect();
  const inside = e.clientX >= r.left && e.clientX <= r.right &&
                 e.clientY >= r.top  && e.clientY <= r.bottom;
  if (!inside) closeDialog();
});

// ESC para cerrar
dialog?.addEventListener('cancel', (e)=>{ e.preventDefault(); closeDialog(); });
