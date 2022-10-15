import { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap";

export default function Credits(props) {
  const { data } = props
  const [cast, setCast] = useState([])
  useEffect(() => {
    if (data != undefined) {
      setCast(data)
    }
  }, [data])

  return (
    <>
      <h5 className="text-white">Cast</h5>
      <div id='holder'>
        <ListGroup className="list-group list-group-horizontal"
          style={{ alignItems: 'flex-start' }}
        >
          {cast && cast?.map(person => {
            return (
              <div className="credit-card">
                <Image
                  style={{ height: '90px' }}
                  src={"https://www.themoviedb.org/t/p/w92" + person.profile_path}
                  roundedCircle
                />
                <p className="person_name text-white">{person.original_name}</p>
              </div>
            )
          })}
        </ListGroup>
      </div>
    </>
  )
}
