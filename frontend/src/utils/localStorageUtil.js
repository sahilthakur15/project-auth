

export const setLocalStorage = (key, value) => {
  if (typeof value === "string") {
    localStorage.setItem(key, value); // Store as a raw string for token
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  
  try {
    return JSON.parse(data); // Try parsing JSON
  } catch (error) {
    return data; // If parsing fails, return as a plain string
  }
};

  export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  