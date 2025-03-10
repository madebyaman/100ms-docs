/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FlutterIcon from '@/assets/FlutterIcon';
import AndroidIcon from '@/assets/icons/AndroidIcon';
import IosIcon from '@/assets/icons/IosIcon';
import JavascriptIcon from '@/assets/icons/JavascriptIcon';
import ReactIcon from '@/assets/icons/ReactIcon';
import ServerIcon from '@/assets/icons/ServerIcon';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    LayersIcon,
    AppleIcon as Ios,
    FlutterIcon as Flutter,
    AndroidIcon as Android,
    ReactIcon as ReactNative,
    JavascriptIcon as JavaScript,
    RocketIcon
} from '@100mslive/react-icons';
import { Listbox } from '@headlessui/react';
import { Flex, Box, Text, CSS } from '@100mslive/react-ui';
import SidebarSection from './SidebarSection';
import PlatformAccordion from './PlatformAccordion';

const accordionIconStyle = { height: '24px', width: '24px', color: 'inherit' };

const platformOrder = [
    { text: 'Web', icon: <JavaScript style={accordionIconStyle} />, key: 'javascript' },
    { text: 'Android', icon: <Android style={accordionIconStyle} />, key: 'android' },
    { text: 'iOS', icon: <Ios style={accordionIconStyle} />, key: 'ios' },
    { text: 'Flutter', icon: <Flutter style={accordionIconStyle} />, key: 'flutter' },
    { text: 'React Native', icon: <ReactNative style={accordionIconStyle} />, key: 'react-native' }
];

const platformlist = ['javascript', 'android', 'ios', 'flutter', 'react-native', 'server-side'];

type NavRoute = {
    url: string;
    title: string;
};

interface Props {
    menuState: {
        menu: boolean;
        setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    nav: Record<string, Record<string, NavRoute>>;
    allNav: Record<string, Record<string, NavRoute>>[];
    css?: CSS;
    hideOnDesktop?: boolean;
    hideBorder?: boolean;
    baseViewOnly?: boolean;
}

const Sidebar: React.FC<Props> = ({
    menuState,
    nav: currentNav,
    allNav,
    css = {},
    hideOnDesktop = false,
    hideBorder = true,
    baseViewOnly = true
}) => {
    const router = useRouter() as any;
    const {
        query: { slug }
    } = router;
    const { menu, setMenu } = menuState;

    const [renderComponents, setRenderComponents] = useState(false);
    const [openPlatformAccordion, setOpenPlatformAccordion] = useState(platformlist[0]);

    useEffect(() => {
        setMenu(false);
    }, [router]);

    const [showBaseView, setShowBaseView] = useState(baseViewOnly);

    useEffect(() => {
        setRenderComponents(true);
    }, []);

    useEffect(() => {
        if (window && window.location.pathname !== '/docs') setShowBaseView(false);
    }, [slug]);

    let nav;
    if (!baseViewOnly && slug) {
        const [currentDocSlug] = slug as string[];

        if (Object.keys(currentNav).length) {
            const platform = currentNav[currentDocSlug];
            if (slug[0] !== 'v1' && slug[0] !== 'v2') {
                if (slug?.length > 3) {
                    nav = platform[slug[1]];
                    if (slug[0] === 'api-reference') {
                        nav = platform[slug[1]][slug[2]];
                    }
                }
            } else nav = platform;
        }
    } else nav = false;

    const showPlatformSelector = slug?.[0] !== 'concepts';

    let indexOf = menuItem.findIndex((e) => e.key === slug?.[0]);
    if (slug?.[0] === 'api-reference') indexOf = menuItem.findIndex((e) => e.key === slug?.[1]);

    indexOf = indexOf === -1 ? 0 : indexOf;
    const [tech, setTech] = useState(menuItem[indexOf]);

    const changeTech = (s) => {
        setTech(s);
        if (slug[0] === 'api-reference')
            router.push(s.apiRef, undefined, {
                shallow: false
            });
        else router.push(s.link, undefined, { shallow: false });
    };

    useEffect(() => setTech(menuItem[indexOf]), [indexOf]);

    const baseRef = useRef<HTMLDivElement>(null);

    const { ['@md']: cssMd, ...cssRest } = css;

    return (
        <Box
            ref={baseRef}
            className="hide-scrollbar"
            css={{
                minWidth: '304px',
                display: hideOnDesktop && !menu ? 'none' : 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                height: 'calc(100vh - 100px)',
                overflowY: 'auto',
                borderRight: hideBorder ? 'none' : '1px solid',
                borderColor: hideBorder ? 'none' : '$borderDefault',
                overscrollBehavior: 'none',
                '@md': {
                    position: 'absolute',
                    top: '0',
                    display: menu ? 'flex' : 'none',
                    height: '100vh',
                    width: '100%',
                    ...(cssMd ?? {})
                },
                '@sm': {
                    w: '100%'
                },
                ...cssRest
            }}>
            {/* Base view */}
            <div
                className={`page ${showBaseView ? 'active-page' : ''}`}
                style={
                    showBaseView
                        ? {
                              padding: menu ? '24px' : '1.75rem',
                              paddingTop: '0',
                              position: menu ? 'initial' : 'sticky',
                              top: '1rem',
                              width: '100%'
                          }
                        : {}
                }>
                {baseViewOnly ? (
                    <Box css={{ pt: '$16', '@md': { pt: 0 } }} />
                ) : (
                    <Flex
                        align="center"
                        gap="1"
                        css={{
                            color: '$primaryLight',
                            mt: '$8',
                            pt: '0',
                            mb: '$12',
                            cursor: 'pointer',
                            '@md': {
                                pt: '$10'
                            }
                        }}
                        onClick={() => setShowBaseView(false)}>
                        <Text variant="sm" css={{ color: '$primaryLight' }}>
                            Continue exploring
                        </Text>
                        <ChevronRightIcon height="16px" width="16px" />
                    </Flex>
                )}
                <Link passHref href="/concepts/v2/concepts/basics">
                    <Flex as="a" gap="2" align="center" css={{ color: '$primaryLight' }}>
                        <LayersIcon style={{ color: 'inherit' }} />
                        <Text as="span" css={{ fontWeight: '$semiBold', color: '$textHighEmp' }}>
                            Concepts
                        </Text>
                    </Flex>
                </Link>

                <Link passHref href="/examples">
                    <Flex
                        as="a"
                        gap="2"
                        align="center"
                        css={{
                            color: '$primaryLight',
                            mt: '$10',
                            display: 'none',
                            '@md': { display: 'flex' }
                        }}>
                        <RocketIcon style={{ color: 'inherit' }} />
                        <Text as="span" css={{ fontWeight: '$semiBold', color: '$textHighEmp' }}>
                            Examples
                        </Text>
                    </Flex>
                </Link>

                <hr style={{ margin: '24px 0' }} />

                {platformOrder.map((platform) => (
                    <PlatformAccordion
                        id={platform.key}
                        key={platform.text}
                        title={platform.text}
                        icon={platform.icon}
                        data={allNav[platform.key]}
                        openPlatformAccordion={openPlatformAccordion}
                        setOpenPlatformAccordion={setOpenPlatformAccordion}
                    />
                ))}

                <hr style={{ margin: '24px 0' }} />

                <PlatformAccordion
                    id="server-side"
                    title={'Server side'}
                    icon={<ServerIcon style={accordionIconStyle} />}
                    data={allNav['server-side']}
                    openPlatformAccordion={openPlatformAccordion}
                    setOpenPlatformAccordion={setOpenPlatformAccordion}
                />
            </div>

            {/* Platform specific view */}
            <div className={`page ${showBaseView ? '' : 'active-page'}`}>
                {renderComponents ? (
                    <>
                        <Box
                            css={{
                                position: 'sticky',
                                top: '0',
                                pt: '$5',
                                zIndex: '100',
                                boxShadow: '0 1.25rem 2rem 0.25rem rgba(8, 9, 12, 0.8)',
                                backgroundColor: 'var(--docs_bg_content)',
                                '@md': {
                                    pt: '$18',
                                    top: '$12',
                                    backgroundColor: 'var(--docs_bg_content)'
                                }
                            }}>
                            <Flex
                                align="center"
                                gap="1"
                                css={{
                                    color: '$primaryLight',
                                    pl: '$9',
                                    mb: '$12',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    setShowBaseView(true);
                                    if (baseRef.current) baseRef?.current.scrollTo(0, 0);
                                }}>
                                <ChevronLeftIcon height="16px" width="16px" />
                                <Text variant="sm" css={{ color: '$primaryLight' }}>
                                    Content overview
                                </Text>
                            </Flex>

                            {showPlatformSelector ? (
                                <section
                                    style={{
                                        margin: '0px 0.5rem 0.5rem 0.4rem',
                                        background: 'var(--docs_bg_content)'
                                    }}>
                                    <Listbox value={tech} onChange={changeTech}>
                                        <Listbox.Button className="dropdown">
                                            <div style={{ display: 'flex ', alignItems: 'center' }}>
                                                {tech.icon}
                                                <span style={{ marginLeft: '1rem' }}>
                                                    {tech.name === 'JavaScript' ? 'Web' : tech.name}
                                                </span>
                                            </div>
                                            <ChevronDownIcon />
                                        </Listbox.Button>
                                        <Listbox.Options className="dropdown-options">
                                            {menuItem.map((m) => (
                                                <Listbox.Option
                                                    key={m.link}
                                                    value={m}
                                                    className={({ active }) =>
                                                        `${
                                                            active
                                                                ? 'dropdown-option dropdown-option-active'
                                                                : 'dropdown-option'
                                                        }`
                                                    }>
                                                    {m.icon}
                                                    <span style={{ marginLeft: '1rem' }}>
                                                        {m.name === 'JavaScript' ? 'Web' : m.name}
                                                    </span>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Listbox>
                                </section>
                            ) : null}
                        </Box>
                        {/* Sidebar Menu Section */}
                        {nav
                            ? Object.entries(nav).map(([key, children], index) => (
                                  <SidebarSection
                                      key={key}
                                      value={key}
                                      index={index}
                                      nested={false}>
                                      {children as React.ReactChildren}
                                  </SidebarSection>
                              ))
                            : null}
                    </>
                ) : null}
            </div>
        </Box>
    );
};

export default Sidebar;

const iconStyle = { height: '24px', width: '24px', fill: 'var(--gray12)' };

export const menuItem = [
    {
        link: '/android/v2/get-started/quickstart',
        name: 'Android',
        key: 'android',
        icon: <AndroidIcon style={iconStyle} />,
        apiRef: '/api-reference/android/v2/index.html'
    },
    {
        link: '/ios/v2/guides/quickstart',
        name: 'iOS',
        key: 'ios',
        icon: <IosIcon style={iconStyle} />,
        apiRef: '/api-reference/ios/v2/home/content'
    },
    {
        link: '/javascript/v2/get-started/javascript-quickstart',
        name: 'JavaScript',
        key: 'javascript',
        icon: <JavascriptIcon style={iconStyle} />,
        apiRef: '/api-reference/javascript/v2/home/content'
    },
    {
        link: '/react-native/v2/guides/quickstart',
        name: 'React Native',
        key: 'react-native',
        icon: <ReactIcon style={iconStyle} />,
        apiRef: '/api-reference/react-native/v2/modules.html'
    },
    {
        link: '/flutter/v2/guides/quickstart',
        name: 'Flutter',
        key: 'flutter',
        icon: <FlutterIcon style={iconStyle} />,
        apiRef: 'https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html'
    },
    {
        link: '/server-side/v2/how--to-guides/make-api-calls',
        name: 'Server-side',
        key: 'server-side',
        icon: <ServerIcon />,
        apiRef: '/server-side/v2/api-reference/Rooms/overview'
    }
];
