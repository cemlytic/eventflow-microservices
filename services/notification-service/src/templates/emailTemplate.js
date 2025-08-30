export function renderEventCreated(evt) {
  const title = evt.title || evt.id;
  const startsAt = evt.startsAt ? new Date(evt.startsAt).toLocaleString() : '';
  return {
    subject: `Yeni etkinlik: ${title}`,
    text: `Yeni bir etkinlik oluşturuldu: ${title}\nBaşlangıç: ${startsAt}`,
    html: `<h3>Yeni etkinlik</h3>
           <p><b>${title}</b></p>
           ${startsAt ? `<p>Başlangıç: ${startsAt}</p>` : ''}`,
  };
}

export function renderEventUpdated(evt) {
  const title = evt.title || evt.id;
  return {
    subject: `Etkinlik güncellendi: ${title}`,
    text: `Etkinlik güncellendi: ${title}`,
    html: `<h3>Etkinlik güncellendi</h3>
           <p><b>${title}</b> güncellendi.</p>`,
  };
}
