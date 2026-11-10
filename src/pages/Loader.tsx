import { IonContent, IonPage, IonSpinner } from '@ionic/react';

import './Loader.css';

const Loader: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="centro">
          <IonSpinner />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Loader;
