import React from 'react';
import EnterIcon from '@/assets/icons/EnterIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import useClickOutside from '@/lib/useClickOutside';
import useKeyPress from '@/lib/useKeyPress';
import useSearch from '@/lib/useSearch';
import Link from 'next/link';

interface Props {
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<Props> = ({ docs, setModal }) => {
    const paletteTrack = React.useRef(-1);
    const [search, setSearch] = React.useState('');
    const ref = React.createRef<HTMLElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    // @ts-ignore

    const res = useSearch({
        search,
        docs
    });
    useClickOutside(ref, () => {
        if (inputRef.current)
            window.analytics.track('docs.search.dismissed', {
                textInSearch: inputRef.current?.value || '',
                totalNumberOfResults: res.length,
                referrer: document.referrer,
                path: window.location.hostname,
                pathname: window.location.pathname,
                href: window.location.href
            });
        setModal(false);
    });

    React.useEffect(() => {
        // @ts-ignore
        inputRef.current?.focus();
    }, []);

    // reset if result is 0
    if (res.length === 0) {
        paletteTrack.current = -1;
    }

    const downKeyPressed = useKeyPress('ArrowDown');
    const upKeyPressed = useKeyPress('ArrowUp');
    if (downKeyPressed) {
        // reset to top
        if (paletteTrack.current >= res.length - 1) {
            paletteTrack.current = 0;
            const last = document.getElementById(`res-box-${res.length - 1}`);
            if (last) {
                last.style.backgroundColor = 'var(--gray3)';
            }
        } else {
            paletteTrack.current += 1;
        }
        const ele = document.getElementById(`res-box-${paletteTrack.current}`);
        if (ele) {
            ele.style.backgroundColor = 'var(--gray6)';
            ele.focus();
        }
        const prev = document.getElementById(`res-box-${paletteTrack.current - 1}`);
        if (prev) {
            prev.style.backgroundColor = 'var(--gray3)';
        }
    }
    if (upKeyPressed) {
        // on top
        if (paletteTrack.current === 0) {
            paletteTrack.current = res.length - 1;
            const top = document.getElementById(`res-box-0`);
            if (top) {
                top.style.backgroundColor = 'var(--gray3)';
            }
        } else {
            paletteTrack.current -= 1;
        }

        const ele = document.getElementById(`res-box-${paletteTrack.current}`);
        if (ele) {
            ele.style.backgroundColor = 'var(--gray6)';
            ele.focus();
        }
        const prev = document.getElementById(`res-box-${paletteTrack.current + 1}`);
        if (prev) {
            prev.style.backgroundColor = 'var(--gray3)';
        }
    }
    return (
        // @ts-ignore
        <div className="search-modal" ref={ref}>
            <div className="input-wrapper">
                <SearchIcon />
                <input
                    ref={inputRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search docs"
                />
                <span className="esc">esc</span>
            </div>
            {res.length > 0 ? (
                <div className="res-ctx">
                    {res.map((searchResult, i) => (
                        <Link href={searchResult.url} key={searchResult.url} passHref>
                            <a
                                id={`res-box-${i}`}
                                className="res-box"
                                onClick={() => {
                                    window.analytics.track('docs.search.result.clicked', {
                                        totalNumberOfResults: res.length,
                                        // @ts-ignore
                                        textInSearch: inputRef?.current?.value || '',
                                        rankOfSearchResult: i + 1,
                                        locationOfSearchResult: searchResult.url,
                                        referrer: document.referrer,
                                        path: window.location.hostname,
                                        pathname: window.location.pathname
                                    });
                                    setModal(false);
                                }}>
                                <div>
                                    <span>{searchResult.title}</span>
                                    <span className="slug">{searchResult.url}</span>
                                </div>
                                <EnterIcon />
                            </a>
                        </Link>
                    ))}
                </div>
            ) : null}
            <style jsx>{`
                .search-modal {
                    max-width: 600px;
                    width: 100%;
                    position: absolute;
                    top: 150px;
                    left: 50%;
                    transform: translate(-50%, 0%);
                    border-radius: 5px;
                    border: 1px solid var(--gray5);
                    background-color: var(--gray1);
                    z-index: 10;
                }
                .input-wrapper {
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid var(--gray5);
                }
                .esc {
                    color: var(--gray8);
                    border-radius: 5px;
                    padding: 0 8px;
                    border: 1px solid var(--gray6);
                }
                input {
                    width: 100%;
                    margin-left: 1rem;
                }
                .res-ctx {
                    width: 100%;
                }
                .res-box:hover {
                    opacity: 0.8;
                }
                .res-box {
                    margin: 0.5rem 0;
                    padding: 0.25rem 2rem;
                    height: 70px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--gray3);
                }
                .res-box div {
                    display: flex;
                    flex-direction: column;
                }
                .res-box .slug {
                    opacity: 0.6;
                }
                a {
                    color: inherit;
                    text-decoration: none;
                }
                a:hover {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default SearchModal;
