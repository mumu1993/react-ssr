export default () => (
    <div className="spinner">
        <style jsx>{`
            @keyframes bounce {
                0%,80%,to {
                    -webkit-transform: scale(0);
                    transform: scale(0)
                }

                40% {
                    -webkit-transform: scale(1);
                    transform: scale(1)
                }
            }

            .spinner {
                width: 100%;
                padding: 14px;
                text-align: center
            }

            .spinner .dot {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin: 0 3px;
                background-color: #383108;
                border-radius: 100%;
                -webkit-animation: bounce 1.6s infinite ease-in-out;
                animation: bounce 1.6s infinite ease-in-out;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both
            }

            .spinner .dot-1 {
                -webkit-animation-delay: -.32s;
                animation-delay: -.32s
            }

            .spinner .dot-2 {
                -webkit-animation-delay: -.16s;
                animation-delay: -.16s
            }
        `}
        </style>
    	<span className="dot dot-1"></span>
    	<span className="dot dot-2"></span>
    	<span className="dot dot-3"></span>
    </div>
)
