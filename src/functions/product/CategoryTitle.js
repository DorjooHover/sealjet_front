export default function CategoryTitle(props) {
    const data = props.data;
    if (data == "") {
      return <>Бүлүүрийн сальник</>;
    } else {
      return <>{data[0].type}</>;
    }
  }