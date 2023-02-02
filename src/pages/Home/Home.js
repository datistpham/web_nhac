import { useState, useEffect } from 'react';
// import request from '~/utils/axios';

// import Carousel from '~/layouts/components/Carousel';

import Loading from '../Loading';
// import Section from '~/components/Section';
// import Item from '~/components/Item';
// import RightSidebar from '~/layouts/components/RightSidebar';
import MainSongRebuild from '~/layouts/components/MainSongRebuild/MainSongRebuild';

function Home() {
    // const [result, setResult] = useState([]);
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false);
    // const [isFail, setIsFail] = useState(false);

    useEffect(() => {
        // request.get('/home').then((res) => {
        //     setIsLoading(false);
        //     // setResult(res.data.items);
        // });
        document.title = 'Trang chủ';
    }, []);

    if (isLoading) {
        return <Loading />;
    }  else {
        return (
            <div>
                {/* <Carousel data={result[0]} /> */}
                {/* {result.map(
                    (playlist, index) =>
                        playlist.sectionType === 'playlist' && (
                            <Section key={index} title={playlist.title}>
                                {playlist.items.map((item) => (
                                    <Item key={item.encodeId} data={item} />
                                ))}
                            </Section>
                        ),
                )} */}
                <MainSongRebuild />
                <div style={{width: '100%'}}>

                </div>
            </div>
        );
    }
}

export default Home;
