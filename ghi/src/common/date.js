export default function toDateFormat(date) {
  const dateArr = date.split("-");
  let wordDate = new Date(dateArr[0], dateArr[1], dateArr[2]);
  wordDate = wordDate.toDateString().split(" ");
  wordDate[2] = wordDate[2] + ",";
  return (wordDate = wordDate.join(" "));
}
