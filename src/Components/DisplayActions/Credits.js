import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
                <LazyLoadImage
                  style={{ height: '90px' }}
                  alt="Cast"
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
