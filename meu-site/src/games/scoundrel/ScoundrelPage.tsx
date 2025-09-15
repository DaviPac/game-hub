import { useState } from "react";
import ScoundrelUI from "./components/ScoundrelUI";
import ScoundrelGuide from "./components/ScoundrelGuide/ScoundrelGuide";
import styles from "./ScoundrelPage.module.css"

function ScoundrelPage() {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <div className={styles.container}>
            <button className={styles.help} onClick={() => setShowHelp(true)}>?</button>
            <ScoundrelGuide isOpen={showHelp} onClose={() => setShowHelp(false)}/>
            <ScoundrelUI />
        </ div>
    )
}

export default ScoundrelPage;