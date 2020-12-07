import React, { useEffect, useState } from 'react';
import jsonapi from 'jsonapi-parse'

const ArticleList = () => {
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = () => {
      fetch("https://janssenpro3-acsfdemo20-prod.acquia-demo.com/jsonapi/node/event?include=field_image,field_image.thumbnail&page[limit]=8")
      .then(res => res.json())
      .then(res =>  setData(jsonapi.parse(res).data))
      .catch((error) => console.log(error));
    };
    
    fetchData();
  }, []);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {data.map(item => (
          <div key={item.id} className="max-w-xs rounded overflow-hidden shadow-lg my-1 w-full md:w-1/2 lg:my-4 lg:mx-4 lg:w-1/3">
            <a href={item.path.alias} title={item.title} target="_blank" >
              <img className="w-full" src={item.field_image.thumbnail.uri.url} alt={item.field_image.thumbnail.meta.alt} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.title}</div>
                <p className="text-grey-darker text-base" dangerouslySetInnerHTML={{__html: item.body.value }} />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
  
export default ArticleList