export function formatDate(value) {
  if (!value) {
    return "";
  }

  const [ano, mes, dia] = value.split("-");

  return `${dia}/${mes}/${ano}`;
}

function pad(i) {
  return (i < 10 ? "0" : "") + i;
}

export function buildDateString(date) {
  let value = new Date();

  if (date) {
    value = date;
  }

  const YYYY = value.getFullYear();
  const MM = pad(value.getMonth() + 1);
  const DD = pad(value.getDate());

  return `${YYYY}-${MM}-${DD}`;
}

export function dateStr2Locale(value) {
  if (!value) {
    return "";
  }

  const [ano, mes, dia] = value.split("-");

  return `${dia}/${mes}/${ano}`;
}

export function toShortDateTime(value) {
  if (!value) {
    return "";
  }

  const d = new Date(value);

  return `${d.toLocaleDateString()} ${d.toLocaleTimeString().substr(0, 5)}`;
}
