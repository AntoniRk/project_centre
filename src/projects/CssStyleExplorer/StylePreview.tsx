import React from 'react';

interface StylePreviewProps {
    styles: Record<string, string>;
    content: string;
}

const StylePreview: React.FC<StylePreviewProps> = ({ styles, content }) => {
    return (
        <div
            className="css-explorer-preview-element"
            style={styles as React.CSSProperties}
        >
            {content}
        </div>
    );
};

export default StylePreview;