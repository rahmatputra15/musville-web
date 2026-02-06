import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-gray-700 bg-gray-900/50 p-2 flex flex-wrap gap-1">
            {/* Bold */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                title="Bold"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("bold")
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
                    />
                </svg>
            </button>

            {/* Italic */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                title="Italic"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("italic")
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 4h6M8 20h6M15 4L9 20"
                    />
                </svg>
            </button>

            {/* Strike */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                title="Strikethrough"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("strike")
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12h18M8 5h8a4 4 0 0 1 0 8H8M8 19h8a4 4 0 0 0 0-8"
                    />
                </svg>
            </button>

            <div className="w-px bg-gray-700 mx-1" />

            {/* H1 */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                title="Heading 1"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("heading", { level: 1 })
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <text x="2" y="18" fontSize="16" fontWeight="bold">
                        H1
                    </text>
                </svg>
            </button>

            {/* H2 */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Heading 2"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("heading", { level: 2 })
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <text x="2" y="18" fontSize="16" fontWeight="bold">
                        H2
                    </text>
                </svg>
            </button>

            {/* H3 */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                title="Heading 3"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("heading", { level: 3 })
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <text x="2" y="18" fontSize="16" fontWeight="bold">
                        H3
                    </text>
                </svg>
            </button>

            {/* Paragraph */}
            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                title="Paragraph"
                className={`px-3 py-2 rounded text-sm font-bold transition-colors ${
                    editor.isActive("paragraph")
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                P
            </button>

            <div className="w-px bg-gray-700 mx-1" />

            {/* Align Left */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                title="Align Left"
                className={`p-2 rounded transition-colors ${
                    editor.isActive({ textAlign: "left" })
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h10M4 18h14"
                    />
                </svg>
            </button>

            {/* Align Center */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                title="Align Center"
                className={`p-2 rounded transition-colors ${
                    editor.isActive({ textAlign: "center" })
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M7 12h10M5 18h14"
                    />
                </svg>
            </button>

            {/* Align Right */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                title="Align Right"
                className={`p-2 rounded transition-colors ${
                    editor.isActive({ textAlign: "right" })
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M10 12h10M6 18h14"
                    />
                </svg>
            </button>

            {/* Align Justify */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                title="Align Justify"
                className={`p-2 rounded transition-colors ${
                    editor.isActive({ textAlign: "justify" })
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            <div className="w-px bg-gray-700 mx-1" />

            {/* Bullet List */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Bullet List"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("bulletList")
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                    <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                </svg>
            </button>

            {/* Ordered List */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="Ordered List"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("orderedList")
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <text x="1" y="8" fontSize="10" fontWeight="bold">
                        1.
                    </text>
                    <text x="1" y="16" fontSize="10" fontWeight="bold">
                        2.
                    </text>
                    <text x="1" y="24" fontSize="10" fontWeight="bold">
                        3.
                    </text>
                    <line
                        x1="8"
                        y1="6"
                        x2="20"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <line
                        x1="8"
                        y1="14"
                        x2="20"
                        y2="14"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <line
                        x1="8"
                        y1="22"
                        x2="20"
                        y2="22"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                </svg>
            </button>

            <div className="w-px bg-gray-700 mx-1" />

            {/* Blockquote */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Quote"
                className={`p-2 rounded transition-colors ${
                    editor.isActive("blockquote")
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
            </button>

            {/* Horizontal Rule */}
            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Horizontal Rule"
                className="p-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 12h16"
                    />
                </svg>
            </button>

            <div className="w-px bg-gray-700 mx-1" />

            {/* Undo */}
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                title="Undo"
                className="p-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h10a8 8 0 0 1 8 8v0M3 10l6 6m-6-6l6-6"
                    />
                </svg>
            </button>

            {/* Redo */}
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                title="Redo"
                className="p-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 10H11a8 8 0 0 0-8 8v0M21 10l-6 6m6-6l-6-6"
                    />
                </svg>
            </button>
        </div>
    );
};

const TextEditor = ({ content, onChange, placeholder = "Start typing..." }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "center", "right", "justify"],
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update editor content when prop changes
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="border border-amber-600/50 rounded-lg overflow-hidden bg-gray-700 text-white">
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="prose prose-invert max-w-none p-4 min-h-50 focus:outline-none"
            />
        </div>
    );
};

export default TextEditor;
