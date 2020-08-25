export default function Styles() {
  return (
    <div>
      <h1>~~ Elements</h1>
      <div>
        <h1>~Typography:</h1>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Normal paragraph styles</p>
        <strong>strong</strong>
        <br />
        <i>italics</i>
        <br />
        <em>emphasis</em>
        <br />
      </div>
      <div>
        <h1>~Lists</h1>
        <p>Ordered List:</p>
        <ol>
          <li>List item 1</li>
          <li>List item 2
            <ol>
              <li>Nested item 1</li>
            </ol>
          </li>
        </ol>
        <p><strong style={{ fontWeight: 'bold' }}>Unordered List:</strong></p>
        <ul>
          <li>List item 1</li>
          <li>List item 2
            <ul>
              <li>Nested item 1</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
