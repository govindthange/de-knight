import '../index.css';

export function SharableLink() {
  const sharableLink = window.location.href;

  async function copyToClipboard() {
    await navigator.clipboard.writeText(sharableLink);
  }

  return (
    <div className="notification is-link share-game">
      <strong>Share link with your opponent...</strong>
      <br />
      <br />
      <div className="field has-addons">
        <div className="control is-expanded">
          <input type="text" name="" id="" className="input" readOnly value={sharableLink} />
        </div>
        <div className="control">
          <button className="button is-info" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
