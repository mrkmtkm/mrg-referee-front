import React, { FunctionComponent } from 'react';
import NLink from 'next/link';

export const Link: FunctionComponent<
    React.HTMLProps<HTMLAnchorElement> & { href: string; as?: string }
> = props => {
    const { href, as, children, ...anchorProps } = props;
    return (
        <NLink href={href} as={as}>
            <a {...anchorProps}>{children}</a>
        </NLink>
    );
};
