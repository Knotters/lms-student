import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Height } from '@material-ui/icons';
import './TextEditor.css';

const TextEditor = () => {
	const [text, setText] = useState('');

	return (
		<div className="ckeditor">
			<CKEditor
				editor={ClassicEditor}
				data={text}
				onReady={(editor) => {
					console.log('Editor is ready to use!', editor);
					editor.editing.view.change((writer) => {
						writer.setStyle(
							'width',
							'100%',
							editor.editing.view.document.getRoot(),
						);
					});
				}}
				onChange={(event, editor) => {
					const data = editor.getData();

					setText(data);
				}}
				style={{
					width: '100%',
					height: '350',
				}}
			/>
		</div>
	);
};

export default TextEditor;
