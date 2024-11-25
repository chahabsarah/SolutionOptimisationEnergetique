from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from PIL import Image
import io
import base64
import time

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
def capture_half_page_screenshot(driver, position):
    if position == 0:
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(1)  # Wait for the scroll to finish
        screenshot = driver.get_screenshot_as_png()
        image = Image.open(io.BytesIO(screenshot))
        return image
    elif position == 1:
        ete_element = driver.find_element(By.XPATH, "//div[@class='soustitreoranger' and text()='Eté']")
        driver.execute_script("arguments[0].scrollIntoView();", ete_element)
        time.sleep(1)
        screenshot = driver.get_screenshot_as_png()
        image = Image.open(io.BytesIO(screenshot))
        location = ete_element.location
        size = ete_element.size
        top = location['y']-500
        bottom = image.height
        left = 0
        right = image.width
        cropped_image = image.crop((left, top, right, bottom))
        return cropped_image

def combine_and_crop_images(image1, image2, output_file, padding=0):
    total_height = image1.height + image2.height
    combined_image = Image.new('RGB', (image1.width, total_height))
    combined_image.paste(image1, (0, 0))
    combined_image.paste(image2, (0, image1.height))
    left = padding + 205
    right = combined_image.width - padding - 200
    top = 205
    bottom = combined_image.height - 25
    cropped_image = combined_image.crop((left, top, right, bottom))
    cropped_image.save(output_file)
    return output_file

@app.route('/capture', methods=['POST'])
def capture():
    data = request.json
    try:
        driver = webdriver.Chrome()
        driver.get("https://steg.com.tn/fr/clients_res/estimez.php")

        Select(driver.find_element(By.NAME, "cuisson_gn")).select_by_value(data['cuisson_gn'])
        Select(driver.find_element(By.NAME, "nb_repas_cgn")).select_by_value(data['nb_repas_cgn'])
        Select(driver.find_element(By.NAME, "chauffe_eau_gn")).select_by_value(data['chauffe_eau_gn'])
        Select(driver.find_element(By.NAME, "ch_central_gn")).select_by_value(data['ch_central_gn'])
        Select(driver.find_element(By.NAME, "nbr_hiver_gn")).select_by_value(data['nbr_hiver_gn'])
        Select(driver.find_element(By.NAME, "nbr_ete_gn")).select_by_value(data['nbr_ete_gn'])

        driver.find_element(By.NAME, "Input").click()

        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "titreoranger")))

        top_half = capture_half_page_screenshot(driver, position=0)
        bottom_half = capture_half_page_screenshot(driver, position=1)

        output_file = 'combined_screenshot.png'
        combine_and_crop_images(top_half, bottom_half, output_file, padding=20)

        with open(output_file, "rb") as image_file:
            base64_image = base64.b64encode(image_file.read()).decode('utf-8')

        driver.quit()
        return jsonify({'status': 'success', 'image': base64_image})

    except Exception as e:
        driver.quit()
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
