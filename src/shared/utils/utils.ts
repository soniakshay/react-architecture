export const maxAllowedNumber = (noOfDigits = 1) => {
  return Number("9".repeat(noOfDigits));
};

export const sortByPropertyInObject = (property: string) => {
  return (a: { [key: string]: any }, b: { [key: string]: any }) =>
    a[String(property)].localeCompare(b[String(property)]);
};
const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: "0px",
    height: 10,
    width: 8,
  },
});
export const customStyleSelect = (
  errors: any,
  name,
  style: any = {
    indicatorsContainer: {},
    placeholder: {},
    control: {},
    menu: {},
    option: {},
    input: {},
    singleValue: {},
  }
) => {
  return {
    indicatorsContainer: (styles) => ({
      ...styles,
      marginRight: 8,
      minHeight: 40,
      ...style.indicatorsContainer,
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: "14px",
      color: "#9B9B9B",
      marginLeft: 10,
      ...style.placeholder,
    }),
    control: (styles, { isDisabled }) => ({
      ...styles,
      borderColor: errors?.[name]?.message ? "#DA1E28" : "#E8E8E8",
      cursor: isDisabled ? "not-allowed" : "default",
      backgroundColor: isDisabled ? "#E8E8E8" : "white",
      color: isDisabled ? "#9B9B9B" : "white",
      "&:hover": {
        borderColor: errors?.[name]?.message ? "#DA1E28" : "hsl(0, 0%, 80%)",
      },
      fontSize: "14px",
      boxShadow: errors?.[name]?.message ? "#DA1E28" : "hsl(0, 0%, 80%)",
      // @ts-ignore
      borderColor: errors?.[name]?.message ? "#DA1E28" : "hsl(0, 0%, 80%)",
      ...style.control,
    }),
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      border: "1px dotted #E8E8E8",
      color: state.isSelected ? "#F26A26" : "#1F1F1F",
      zIndex: 2,
      control: (_, { selectProps: { width } }) => ({
        width: width,
      }),
      ...style.menu,
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: 0,
      color: state.isSelected ? "#F26A26" : "#1F1F1F",
      backgroundColor: state.isSelected ? "#F9F9F9" : "#ffffff",
      padding: "12px 16px",
      fontSize: 14,
      "&:hover": {
        backgroundColor: "#F9F9F9",
        // color: "#F26A26",
      },
      ...style.option,
    }),
    input: (styles) => {
      return { ...styles, ...dot(), ...style.input };
    },
    singleValue: (styles, { data }) => ({
      ...styles,
      marginRight: "0px",
      fontSize: "14px",
      ...dot(data.color),
      ...style.singleValue,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };
};

export const IsValidUSPhoneNumber = (value) => {
  if (value) {
    const regex = new RegExp(
      "^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$"
    );
    return value.match(regex);
  }
  return false;
};
export const IsValidEmail = (value) => {
  if (value) {
    const regex = new RegExp("^$|^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    return value.match(regex);
  }
  return false;
};

export const formatDate = (date) => {
  return new Date(date)
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toString();
};

export const formatCreatedDate = (
  date,
  displaySeconds = false,
  isShowLocalTime = true
) => {
  // if is show utc string
  if (!isShowLocalTime) {
    if (displaySeconds) {
      return moment(date).utc().format("MMM D, YYYY, HH:mm:ss A");
      // return  new Date(date).toUTCString();
    }
    return moment(date).utc().format("MMM D, YYYY, HH:mm:ss A");
    // return  new Date(date).toUTCString();
  }

  if (displaySeconds) {
    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .toString();
  }
  return new Date(date)
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toString();
};

export const getRandomString = (length = 16) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const IsValidPostalZipOrPostalCode = (value) => {
  const regex = new RegExp("^\\d{5}(?:[-\\s]\\d{4})?$");
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
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
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
