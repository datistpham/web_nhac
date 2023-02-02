// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGripLines, faMusic, faPlay, faArrowRightArrowLeft, faPause } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { setArtistName, setIsPlay, setTrackName } from '~/redux/features/audioSlice';
import styles from './SongItem.module.scss';
// import images from '~/assets';

const cx = classNames.bind(styles);

function SongItemRebuild(data) {
    const dispatch= useDispatch()
    
    return (
        <div
            onClick={()=> {
                dispatch(setIsPlay(true))
                dispatch(setTrackName(data?.track_name))
                dispatch(setArtistName(data?.artist_name))
            }}
            className={cx(
                'container',
            )}
        >
            <div className={cx('content-left')}>
                {/* {serial && <p className={cx('serial')}>{index + 1}</p>}
                <div className={cx('left-icon')}>
                    {serial ? <FontAwesomeIcon icon={faGripLines} /> : <FontAwesomeIcon icon={faMusic} />}
                </div> */}
                {/* <div className={cx('avatar')}>
                    <img src={data?.thumbnail} alt={data?.alias} className={cx('song-img')} />
                </div> */}
                <div className={cx('info')}>
                    <div className={cx('song-title')}>
                        <div>
                            <span className={cx('name')}>{data?.track_name}</span>
                            <div className={cx('name')} style={{fontSize: 12, fontWeight: 400, color: "#ffffff80"}}>{data?.artist_name}</div>
                        </div>
                        {/* {(data?.streamingStatus === 1 && data?.isWorldWide === true) || data?.type === 'livestream' ? (
                            ''
                        ) : (
                            <span className={cx('vip-label')}>
                                <img src={images.vipLabel} alt="vip" />
                            </span>
                        )} */}
                    </div>
                </div>
            </div>
            <div className={cx('content-right')}>
                {
                    data?.duration_ms?.length > 0 && 
                    <p className={cx('song-time')}>
                        {data?.duration_ms && Math.floor(parseInt(data?.duration_ms) / 1000 / 60) < 10 ? "0"+Math.floor(parseInt(data?.duration_ms) / 1000 / 60): Math.floor(parseInt(data?.duration_ms) / 1000 / 60)}:{Math.round((parseInt(data?.duration_ms) / 1000) - (Math.floor(parseInt(data?.duration_ms) / 1000 / 60) * 60)) < 10 ? "0"+Math.round((parseInt(data?.duration_ms) / 1000) - (Math.floor(parseInt(data?.duration_ms) / 1000 / 60) * 60)): Math.round((parseInt(data?.duration_ms) / 1000) - (Math.floor(parseInt(data?.duration_ms) / 1000 / 60) * 60))}
                    </p>
                }
            </div>
        </div>
    )
}

export default SongItemRebuild;
