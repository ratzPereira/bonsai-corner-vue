<script setup>

</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-text">My Bonsai Corner, all rights reserved.</div>
      <div class="footer-terms">
        <a href="#">Terms of Service</a>
      </div>
      <div class="footer-social">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
  </div>
</template>


<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f0f0f0;
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-text {
  font-size: 16px;
  margin-bottom: 10px;
}

.footer-terms {
  font-size: 14px;
  margin-bottom: 10px;
}

.footer-terms a {
  color: #666666;
}

.footer-terms a:hover {
  text-decoration: underline;
}

.footer-social {
  display: flex;
  justify-content: center;
}

.footer-social a {
  display: inline-block;
  margin: 0 10px;
  font-size: 24px;
  color: #666666;
}

.footer-social a:hover {
  color: #40a9ff;
}
</style>