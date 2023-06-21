export const maxAllowedNumber = (noOfDigits = 1) => {
  return Number('9'.repeat(noOfDigits));
};

export const sortByPropertyInObject = (property: string) => {
  return (a: { [key: string]: any }, b: { [key: string]: any }) =>
    a[String(property)].localeCompare(b[String(property)]);
};


export const IsValidUSPhoneNumber = (value) => {
  if (value) {
    const regex = new RegExp(
      '^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$',
    );
    return value.match(regex);
  }
  return false;
};
export const IsValidEmail = (value) => {
  if (value) {
    const regex = new RegExp('^$|^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    return value.match(regex);
  }
  return false;
};

export const formatDate = (date) => {
  return new Date(date)
    .toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toString();
};



export const getRandomString = (length = 16) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const IsValidPostalZipOrPostalCode = (value) => {
  const regex = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  return value.match(regex);
};

export const formatInteger = (num) => {
  // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num.toLocaleString();
};
export const camalize = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};
export const uniqueValueFromArray = (value, index, self) => {
  return self.indexOf(value) === index;
};
export const formatNumber = (num) => {
  // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
  });
  return formatter.format(num);
};
export const scrollToTop = (ref) => {
  if (ref.current) {
    ref.current.scrollTo(0, 0);
  }
};
export const clonedeep = ({ data }) => {
  return JSON.parse(JSON.stringify(data));
};
