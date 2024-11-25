from flask import Flask, request, jsonify, send_file
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image, ImageDraw, ImageFont
import io
import time
import logging

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('scrape_steg')

@app.route('/simuler', methods=['POST'])
def simuler():
    data = request.json  # Get the JSON data from the request

    driver = webdriver.Chrome()

    try:
        # Open the webpage
        url = "https://www.steg.com.tn/fr/clients_res/simulez.php"
        driver.get(url)
        time.sleep(2) 
        # Période de Consommation
        try:
            periode_select = Select(driver.find_element(By.NAME, "duree"))
            options = [option.get_attribute('value') for option in periode_select.options]
            logger.info(f"Available options for 'duree': {options}")
            periode_select.select_by_value(data['duree'])
        except Exception as e:
            logger.error(f"Error selecting 'duree': {e}")
            return jsonify({"error": f"Error selecting 'duree': {e}"}), 500

        # Usage
        try:
            usage_select = Select(driver.find_element(By.NAME, "usage"))
            options = [option.get_attribute('value') for option in usage_select.options]
            logger.info(f"Available options for 'usage': {options}")
            usage_select.select_by_value(data['usage'])
        except Exception as e:
            logger.error(f"Error selecting 'usage': {e}")
            return jsonify({"error": f"Error selecting 'usage': {e}"}), 500

        # Compteur Eclairage
        if data.get('consom_eclairage'):
            driver.find_element(By.NAME, "chkeclai").click()
            try:
                PEclairage_select = Select(driver.find_element(By.NAME, "PEclairage"))
                options = [option.get_attribute('value') for option in PEclairage_select.options]
                logger.info(f"Available options for 'PEclairage': {options}")
                PEclairage_select.select_by_value(data['PEclairage'])
                driver.find_element(By.NAME, "consom_eclairage").send_keys(data['consom_eclairage'])
            except Exception as e:
                logger.error(f"Error selecting 'PEclairage': {e}")
                return jsonify({"error": f"Error selecting 'PEclairage': {e}"}), 500

        # Compteur Chauffe-eau
        if data.get('consom_chauffe'):
            driver.find_element(By.NAME, "chkchauffe").click()
            try:
                Pchauffe_select = Select(driver.find_element(By.NAME, "Pchauffe"))
                options = [option.get_attribute('value') for option in Pchauffe_select.options]
                logger.info(f"Available options for 'Pchauffe': {options}")
                Pchauffe_select.select_by_value(data['Pchauffe'])
                driver.find_element(By.NAME, "consom_chauffe").send_keys(data['consom_chauffe'])
            except Exception as e:
                logger.error(f"Error selecting 'Pchauffe': {e}")
                return jsonify({"error": f"Error selecting 'Pchauffe': {e}"}), 500

        # Compteur Climatisation
        if data.get('consom_clim'):
            driver.find_element(By.NAME, "chkclim").click()
            try:
                PClim_select = Select(driver.find_element(By.NAME, "PClim"))
                options = [option.get_attribute('value') for option in PClim_select.options]
                logger.info(f"Available options for 'PClim': {options}")
                PClim_select.select_by_value(data['PClim'])
                driver.find_element(By.NAME, "consom_clim").send_keys(data['consom_clim'])
            except Exception as e:
                logger.error(f"Error selecting 'PClim': {e}")
                return jsonify({"error": f"Error selecting 'PClim': {e}"}), 500

        # Compteur Gaz
        if data.get('consom_gaz'):
            driver.find_element(By.NAME, "chkgaz").click()
            try:
                debit_select = Select(driver.find_element(By.NAME, "debit"))
                options = [option.get_attribute('value') for option in debit_select.options]
                logger.info(f"Available options for 'debit': {options}")
                debit_select.select_by_value(data['debit'])
                driver.find_element(By.NAME, "consom_gaz").send_keys(data['consom_gaz'])
            except Exception as e:
                logger.error(f"Error selecting 'debit': {e}")
                return jsonify({"error": f"Error selecting 'debit': {e}"}), 500

        # Submit the form
        driver.find_element(By.NAME, "Input").click()

        # Wait for the redirected page to load
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "titreoranger")))

        # Locate and capture the desired element
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(3) > td.texte1 > table > tbody > tr > td > table:nth-child(7) > tbody > tr > td > table"))
        )

        # Scroll to the element to ensure it's in view
        driver.execute_script("arguments[0].scrollIntoView();", element)
        padding = 20  # Add padding to crop area

        # Capture screenshot of the element
        location = element.location
        size = element.size
        screenshot = driver.get_screenshot_as_png()
        image = Image.open(io.BytesIO(screenshot))

        # Adjust crop boundaries
        left = max(location['x'] - padding + 50, 0)
        right = location['x'] + size['width'] + padding + 200
        top = 0
        bottom = image.height
        # Crop the image with adjusted boundaries
        capture = image.crop((left, top, right, bottom))

        # Define the coordinates to remove the highlighted green area
        left = 20
        top = 8
        right = 4500
        bottom = 100

        # Create a blank area (white) to overwrite the green area
        draw = ImageDraw.Draw(capture)
        draw.rectangle([left, top, right, bottom], fill="white")

        # Load logos
        steg_logo = Image.open("./steg.png")
        flowenergy_logo = Image.open("./energyflow.png")

        # Resize logos if needed (adjust sizes as necessary)
        steg_logo = steg_logo.resize((100, 100))
        flowenergy_logo = flowenergy_logo.resize((100, 100))

        # Paste logos on the image
        capture.paste(flowenergy_logo, (left, top), flowenergy_logo)
        capture.paste(steg_logo, (right - 4000, top), steg_logo)

        # Add the new text
        font = ImageFont.truetype("arial.ttf", 10)  # Make sure you have a suitable font file

        # Calculate text width and height for centering
        text = " ".upper()
        bbox = font.getbbox(text)
        text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]

        # Position the text in the center
        text_x = (right - 3660 - left - text_width) // 2 + left
        text_y = (bottom - top - text_height) // 2 + top

        draw.text((text_x, text_y), text, fill="#063970", font=font)

        # Save the modified image to an in-memory file
        img_io = io.BytesIO()
        capture.save(img_io, 'PNG')
        img_io.seek(0)

        return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='steg_simulated_bill_captured_mod.png')

    except Exception as e:
        logger.error(f"Simulation Error: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        driver.quit()

if __name__ == '__main__':
    app.run(debug=True, port=5000)


