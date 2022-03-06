const Loading = () => {
    return (
        <div
            className="d-flex justify-content-content align-items-center"
            style={{ height: '100vh' }}
        >
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
