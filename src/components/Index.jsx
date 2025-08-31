import React from 'react';

const Index = () => {
    // --- STYLES ---
    const styles = {
        body: {
            fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
            backgroundColor: '#f9f9f9',
            color: '#111418',
        },
        primaryColor: '#0d7ff2',
        secondaryColor: '#f0f2f4',
        textPrimary: '#111418',
        textSecondary: '#637488',
        accentColor: '#e0e7ff',
        buttonPrimary: {
            backgroundColor: '#0d7ff2',
            color: 'white',
            borderColor: '#0d7ff2',
            fontWeight: 'bold',
        },
        heroSection: {
            position: 'relative',
            color: 'white',
        },
        heroOverlay: {
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        heroImage: {
            position: 'absolute',
            inset: 0,
            height: '100%',
            width: '100%',
            objectFit: 'cover',
        },
        card: {
            transition: 'all 0.3s ease',
        },
    };

    // --- SVG ICONS ---
    const Logo = () => (
        <svg style={{ color: styles.primaryColor }} className="h-8 w-8" height="32" width="32" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
        </svg>
    );

    const FeatureIcon1 = () => (
        <svg fill={styles.primaryColor} height="32px" viewBox="0 0 256 256" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path></svg>
    );

    const FeatureIcon2 = () => (
        <svg fill={styles.primaryColor} height="32px" viewBox="0 0 256 256" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
    );

    const FeatureIcon3 = () => (
        <svg fill={styles.primaryColor} height="32px" viewBox="0 0 256 256" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32l27.72-27.72a40,40,0,1,0,17.87,31.09,8,8,0,1,1,16-.9,56,56,0,1,1-22.38-41.65L184.3,60.39a87.88,87.88,0,1,0,23.13,29.67,8,8,0,0,1,14.44-6.9Z"></path></svg>
    );


    return (
        <div style={styles.body}>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-grow-1">
                {/* Hero Section */}
                {/*<section style={styles.heroSection} className="py-5 text-center">*/}
                {/*    <img alt="배경 이미지" style={styles.heroImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSadjoY7y0qAvSBtrdvQ2ojDnx7NXcj9QCKADI0HbXbOfgVkZI9s0wOmpYWgyZ-M76g9Sa43mvfF86_0ZxGJ3Zau4NdUkP9GKctP3siKREdq9_OWbL9ITTaRoGev8k_m4kncCyVvMTAF_FbGNY9oorI0MA8I2RrJ_IVjufW57DJZOUBeg5Kto5WldTMwCiwXVosFIaIzDyc5Zb5kb4RSbHyMgUSNaXTv41rRszOxvAa28htxca3s088lqvNjA7QXI2clK7nYS1q2Q" />*/}
                {/*    <div style={styles.heroOverlay}></div>*/}
                {/*    <div className="container position-relative py-5 my-5">*/}
                {/*        <h1 className="display-3 fw-bolder mb-4">AI 기반 맞춤형 자소서 작성 솔루션</h1>*/}
                {/*        <p className="lead fs-5 mx-auto mb-5" style={{maxWidth: '48rem', color: 'rgba(255,255,255,0.9)'}}>*/}
                {/*            당신의 경험과 역량을 채용 공고에 딱 맞게 재구성하여, 합격 확률을 높이는 가장 확실한 방법을 제시합니다.*/}
                {/*        </p>*/}
                {/*        <button className="btn btn-lg px-5 py-3" style={styles.buttonPrimary}>자소서 작성 시작하기</button>*/}
                {/*    </div>*/}
                {/*</section>*/}

                {/* Features Section */}
                <section className="py-5 bg-white">
                    <div className="container py-5">
                        <div className="text-center mx-auto mb-5" style={{maxWidth: '56rem'}}>
                            <h2 className="display-5 fw-bold mb-4">AI 기반 맞춤형 자소서 작성</h2>
                            <p className="fs-5" style={{color: styles.textSecondary}}>
                                <strong>채용공고 분석</strong>부터 회사 인재상 파악, 그리고 당신의 <strong>경험을 최적으로 재구성</strong>하는 것까지. <br />
                                자소서 작성의 모든 과정을 자소서 AI가 책임집니다.
                            </p>
                        </div>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card h-100 text-center shadow-sm" style={styles.card}>
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <div className="p-3 rounded-circle mb-4"
                                             style={{backgroundColor: styles.accentColor}}>
                                            <FeatureIcon1/>
                                        </div>
                                        <h3 className="fs-4 fw-bold mb-2">채용공고 URL 자동 분석</h3>
                                        <p style={{color: styles.textSecondary}}>
                                            채용공고 URL만 입력하면 AI가 공고 내용을 자동 분석해, 직무와 요구 역량을 한눈에 보여줍니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 text-center shadow-sm" style={styles.card}>
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <div className="p-3 rounded-circle mb-4"
                                             style={{backgroundColor: styles.accentColor}}>
                                            <FeatureIcon2/>
                                        </div>
                                        <h3 className="fs-4 fw-bold mb-2">회사 분석 & 인재상 파악</h3>
                                        <p style={{color: styles.textSecondary}}>
                                            채용공고와 기업 정보를 바탕으로, 회사의 인재상을 분석해 가장 어울리는 지원자 이미지를 제시합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 text-center shadow-sm" style={styles.card}>
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <div className="p-3 rounded-circle mb-4"
                                             style={{backgroundColor: styles.accentColor}}>
                                            <FeatureIcon3/>
                                        </div>
                                        <h3 className="fs-4 fw-bold mb-2">경험 매칭 & 최적화</h3>
                                        <p style={{color: styles.textSecondary}}>
                                            업로드한 자소서에서 가장 적합한 경험을 골라, 채용공고에 맞춰 최적화된 자소서를 자동으로 완성합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Index;
