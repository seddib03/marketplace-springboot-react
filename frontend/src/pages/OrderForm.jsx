import React, { useState } from "react";
import './OrderForm.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullname || !formData.email) {
      setError("Le nom complet et l'email sont obligatoires");
      return false;
    }

    // Si paiement par carte, valider les champs carte
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        setError("Veuillez remplir tous les champs de la carte bancaire");
        return false;
      }
      // Simple validation numéro carte (16 chiffres)
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ''))) {
        setError("Le numéro de carte est invalide");
        return false;
      }
      // Expiration MM/YY
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        setError("La date d'expiration doit être au format MM/AA");
        return false;
      }
      // CVV 3 chiffres
      if (!/^\d{3}$/.test(formData.cvv)) {
        setError("Le CVV est invalide");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simuler un délai de paiement (ex: 2s)
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h2>Paiement effectué avec succès !</h2>
          <p>Merci pour votre commande.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-container">
      <div className="order-card">
        <h2>Formulaire de paiement</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Entrez votre nom complet"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div className="form-group">
            <label>Méthode de paiement</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="card">Carte bancaire</option>
              {/* Tu peux ajouter d'autres méthodes ici si besoin */}
            </select>
          </div>

          {formData.paymentMethod === "card" && (
            <>
              <div className="form-group">
                <label>Numéro de carte</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group small">
                  <label>Date d'expiration (MM/AA)</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/AA"
                    maxLength="5"
                    required
                  />
                </div>

                <div className="form-group small">
                  <label>CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" disabled={isLoading} className={`submit-btn ${isLoading ? 'loading' : ''}`}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Paiement en cours...
              </>
            ) : "Confirmer le paiement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
