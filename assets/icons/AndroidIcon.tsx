import React from 'react';

function AndroidIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 412 412"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
            width={24}
            height={24}
            style={{ fill: 'var(--foreground)', marginRight: '1rem' }}
            {...props}>
            <path
                d="M67.595 138.372c-13.043-.007-23.613 10.59-23.617 23.622l.016 98.906c.004 13.078 10.58 23.632 23.626 23.629 13.052 0 23.626-10.555 23.613-23.626v-98.922c-.006-13.029-10.59-23.616-23.638-23.61m190.475-88.82l16.485-30.104c.878-1.573.302-3.575-1.29-4.466-1.61-.853-3.595-.274-4.448 1.31l-16.652 30.418c-14.011-6.236-29.692-9.73-46.284-9.714-16.546-.017-32.22 3.468-46.174 9.67l-16.672-30.342a3.253 3.253 0 00-4.434-1.307c-1.602.866-2.191 2.87-1.3 4.44l16.492 30.085c-32.404 16.71-54.3 48.536-54.28 85.075l212.762-.025c.01-36.527-21.846-68.288-54.205-85.04M157.49 96.072c-4.894-.01-8.89-3.993-8.89-8.917 0-4.9 3.983-8.93 8.9-8.926 4.933-.003 8.923 4.025 8.93 8.926.003 4.917-3.997 8.914-8.94 8.917m96.882-.02c-4.917.007-8.92-3.98-8.92-8.916.02-4.891 3.997-8.92 8.923-8.94 4.895.017 8.908 4.049 8.904 8.943.007 4.927-3.993 8.917-8.907 8.914m-153.99 46.782l.035 153.285c-.01 13.943 11.27 25.2 25.203 25.2l17.161.006.02 52.336c-.004 13.032 10.59 23.626 23.603 23.626 13.052 0 23.626-10.603 23.63-23.642l-.014-52.323 31.887-.01.013 52.333c0 13.023 10.596 23.639 23.613 23.613 13.051.01 23.632-10.594 23.629-23.632l-.016-52.32 17.222-.013c13.901.006 25.21-11.263 25.216-25.21l-.03-153.285-211.172.036zM367.9 161.959c-.003-13.049-10.574-23.623-23.622-23.616-13.043-.013-23.61 10.577-23.61 23.625l.02 98.913c-.004 13.058 10.563 23.613 23.615 23.616 13.046-.003 23.61-10.558 23.613-23.63l-.016-98.908z"
                fillRule="nonzero"
            />
        </svg>
    );
}

export default AndroidIcon;
