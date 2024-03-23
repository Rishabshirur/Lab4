import React from 'react';
import {Route, Link, Routes} from 'react-router-dom';   
function Home(props) {
    return (
        <div>
            <p>Welcome to the The Metropolitan Museum of ArtAPI</p>

            <p>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.</p>
            <div>
            <Link className='showlink' to='/collection/page/1'>
                Shows
            </Link>
            </div>
        </div>
        
    );
}

export default Home;