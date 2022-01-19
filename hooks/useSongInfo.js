import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);
    const [groovyInfo, setGroovyInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        },
                    }
                );
                const res = await trackInfo.json();
                setSongInfo(res);
                console.log(res);
            }
        };
        fetchSongInfo();
    }, [currentIdTrack, spotifyApi]);

    // useEffect(() => {
    //     const fetchGroovyInfo = async () => {
    //         if (currentIdTrack) {
    //             const trackInfo2 = await fetch(
    //                 `https://api.spotify.com/v1/audio-features/${currentIdTrack}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${spotifyApi.getAccessToken()}`
    //                     }
    //                 }
    //             ).then(res => res.json());

    //             setGroovyInfo(trackInfo2);
    //             console.log(trackInfo2);
    //         }
    //     }
    //     fetchGroovyInfo();
    // }, [currentIdTrack, spotifyApi]);

    return songInfo;
}

export default useSongInfo;
