import HeaderDetail from './Header/Index'
import Main from './Header/Main'
export default function Header({data, perPage}) {
    if(perPage == data.info_id) {
        return (
            <HeaderDetail data={data}/>
        )
    } else {
        return (
            <Main data={data} />
        )
    }

}
